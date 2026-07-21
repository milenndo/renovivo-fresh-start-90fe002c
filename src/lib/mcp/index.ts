import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listServiceCategories from "./tools/list-service-categories";
import listServicePrices from "./tools/list-service-prices";
import listBlogPosts from "./tools/list-blog-posts";
import createInspectionRequest from "./tools/create-inspection-request";
import listInspectionRequests from "./tools/list-inspection-requests";

// The OAuth issuer MUST be the direct Supabase host, built from the project ref
// (VITE_SUPABASE_PROJECT_ID is inlined by Vite at build time, so no runtime env read).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "renovivo-mcp",
  title: "Renovivo",
  version: "0.1.0",
  instructions:
    "Tools for Renovivo — a renovation services company in Bulgaria. Read service categories and prices (BGN), read blog posts, and submit or (for admins) list site-inspection requests. All tools act as the signed-in Renovivo user and respect row-level security.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listServiceCategories,
    listServicePrices,
    listBlogPosts,
    createInspectionRequest,
    listInspectionRequests,
  ],
});
