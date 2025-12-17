import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ServicePrice {
  id: string;
  service_name: string;
  price_min: number | null;
  price_max: number | null;
  unit: string;
  notes: string | null;
  includes_materials: boolean | null;
}

interface PriceTableProps {
  categorySlug?: string;
  title?: string;
  showAll?: boolean;
  limit?: number;
}

// BNB fixed rate: 1 EUR = 1.95583 BGN
const BGN_TO_EUR = 1.95583;

const formatPrice = (priceMin: number | null, priceMax: number | null): { bgn: string; eur: string } | null => {
  if (priceMin === null && priceMax === null) {
    return null;
  }
  
  if (priceMin !== null && priceMax !== null && priceMin !== priceMax) {
    const bgnStr = `${priceMin.toFixed(2)} – ${priceMax.toFixed(2)} лв.`;
    const eurMin = (priceMin / BGN_TO_EUR).toFixed(2);
    const eurMax = (priceMax / BGN_TO_EUR).toFixed(2);
    const eurStr = `${eurMin} – ${eurMax} €`;
    return { bgn: bgnStr, eur: eurStr };
  }
  
  const price = priceMin ?? priceMax;
  if (price !== null) {
    const bgnStr = `${price.toFixed(2)} лв.`;
    const eurStr = `${(price / BGN_TO_EUR).toFixed(2)} €`;
    return { bgn: bgnStr, eur: eurStr };
  }
  
  return null;
};

export const PriceTable = ({ categorySlug, title = "Ценоразпис", showAll = false, limit = 10 }: PriceTableProps) => {
  const { data: prices, isLoading, error } = useQuery({
    queryKey: ["service-prices", categorySlug],
    queryFn: async () => {
      let query = supabase
        .from("service_prices")
        .select(`
          id,
          service_name,
          price_min,
          price_max,
          unit,
          notes,
          includes_materials,
          service_categories!inner(slug, name)
        `);
      
      if (categorySlug && !showAll) {
        query = query.eq("service_categories.slug", categorySlug);
      }
      
      const { data, error } = await query.order("service_name");
      
      if (error) throw error;
      return data as unknown as (ServicePrice & { service_categories: { slug: string; name: string } })[];
    },
  });

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !prices || prices.length === 0) {
    return null;
  }

  const displayPrices = limit && !showAll ? prices.slice(0, limit) : prices;

  // Group by category if showing all
  const groupedPrices = showAll
    ? displayPrices.reduce((acc, price) => {
        const categoryName = price.service_categories?.name || "Други";
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(price);
        return acc;
      }, {} as Record<string, typeof displayPrices>)
    : { [title]: displayPrices };

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <CardHeader className="bg-secondary/50">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {Object.entries(groupedPrices).map(([categoryName, categoryPrices]) => (
          <div key={categoryName}>
            {showAll && (
              <div className="bg-muted/50 px-4 py-2 font-semibold text-sm border-b">
                {categoryName}
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Услуга</th>
                    <th className="px-4 py-3 text-right font-semibold whitespace-nowrap">Цена (лв.)</th>
                    <th className="px-4 py-3 text-right font-semibold whitespace-nowrap">Цена (€)</th>
                    <th className="px-4 py-3 text-center font-semibold">Ед.</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryPrices.map((price, index) => {
                    const formattedPrice = formatPrice(price.price_min, price.price_max);
                    return (
                      <tr 
                        key={price.id} 
                        className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}
                      >
                        <td className="px-4 py-3">
                          <div>
                            <span className="font-medium">{price.service_name}</span>
                            {price.notes && price.notes !== "По договаряне" && (
                              <span className="text-xs text-muted-foreground ml-2">
                                ({price.notes})
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          {formattedPrice ? (
                            <span className="font-semibold text-primary">{formattedPrice.bgn}</span>
                          ) : (
                            <span className="text-muted-foreground">
                              по договаряне <em className="text-xs">(след оглед)</em>
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          {formattedPrice ? (
                            <span className="text-muted-foreground">{formattedPrice.eur}</span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center text-muted-foreground">
                          {price.unit}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <div className="px-4 py-3 bg-muted/30 border-t">
          <p className="text-xs text-muted-foreground">
            * Всички цени са без ДДС и са ориентировъчни. Могат да варират в зависимост от спецификата на обекта.
            <br />
            * Курс: 1 EUR = 1.95583 лв. (фиксинг на БНБ)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceTable;
