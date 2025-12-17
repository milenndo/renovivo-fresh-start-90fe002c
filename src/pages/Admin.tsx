import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, MapPin, Clock, User, Filter, LogOut, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "@/hooks/useAdminAuth";

type InspectionRequest = {
  id: string;
  client_name: string;
  client_phone: string;
  client_email: string | null;
  address: string;
  preferred_datetime: string | null;
  notes: string | null;
  created_at: string;
  status: string | null;
};

const statusOptions = [
  { value: "all", label: "Всички" },
  { value: "pending", label: "Изчакващи" },
  { value: "confirmed", label: "Потвърдени" },
  { value: "completed", label: "Завършени" },
  { value: "cancelled", label: "Отказани" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const statusLabels: Record<string, string> = {
  pending: "Изчакващ",
  confirmed: "Потвърден",
  completed: "Завършен",
  cancelled: "Отказан",
};

const Admin = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAdminAuth();
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ["inspection-requests", statusFilter, dateFrom, dateTo],
    queryFn: async () => {
      let query = supabase
        .from("inspection_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      if (dateFrom) {
        query = query.gte("created_at", `${dateFrom}T00:00:00`);
      }

      if (dateTo) {
        query = query.lte("created_at", `${dateTo}T23:59:59`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as InspectionRequest[];
    },
    enabled: isAdmin,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("inspection_requests")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspection-requests"] });
      toast.success("Статусът е обновен");
    },
    onError: () => {
      toast.error("Грешка при обновяване на статуса");
    },
  });

  const clearFilters = () => {
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
  };

  // Loading state
  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Зареждане...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Not admin state
  if (!isAdmin) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Достъпът е отказан</h1>
            <p className="text-muted-foreground mb-6">
              Нямате права за достъп до тази страница. Само администратори могат да преглеждат заявките за оглед.
            </p>
            <Button onClick={signOut} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Изход
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Заявки за оглед
              </h1>
              <p className="text-muted-foreground">
                Преглед и управление на всички заявки за оглед
              </p>
            </div>
            <Button onClick={signOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Изход
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-lg border p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Филтри</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Статус
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  От дата
                </label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  До дата
                </label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button variant="outline" onClick={clearFilters}>
                  Изчисти филтрите
                </Button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-4 text-sm text-muted-foreground">
            {requests?.length ?? 0} заявки
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="text-center py-12">Зареждане...</div>
          ) : requests && requests.length > 0 ? (
            <div className="bg-card rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Контакт</TableHead>
                    <TableHead>Адрес</TableHead>
                    <TableHead>Предпочитано време</TableHead>
                    <TableHead>Дата на заявка</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{request.client_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <a href={`tel:${request.client_phone}`} className="hover:underline">
                              {request.client_phone}
                            </a>
                          </div>
                          {request.client_email && (
                            <div className="text-sm text-muted-foreground">
                              {request.client_email}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="max-w-[200px] truncate">{request.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {request.preferred_datetime ? (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{request.preferred_datetime}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(request.created_at), "dd MMM yyyy, HH:mm", {
                              locale: bg,
                            })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusColors[request.status || "pending"]}
                        >
                          {statusLabels[request.status || "pending"]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={request.status || "pending"}
                          onValueChange={(value) =>
                            updateStatusMutation.mutate({ id: request.id, status: value })
                          }
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Изчакващ</SelectItem>
                            <SelectItem value="confirmed">Потвърден</SelectItem>
                            <SelectItem value="completed">Завършен</SelectItem>
                            <SelectItem value="cancelled">Отказан</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border">
              <p className="text-muted-foreground">Няма намерени заявки</p>
            </div>
          )}

          {/* Notes section for requests with notes */}
          {requests?.some((r) => r.notes) && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Бележки към заявките</h2>
              <div className="space-y-3">
                {requests
                  .filter((r) => r.notes)
                  .map((request) => (
                    <div key={request.id} className="bg-card rounded-lg border p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{request.client_name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.notes}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
