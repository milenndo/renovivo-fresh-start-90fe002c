// Ambient declaration for `process.env` used inside MCP tool handlers.
// At runtime these files execute in the Deno-based Supabase Edge Function bundle
// produced by @lovable.dev/mcp-js, where `process.env` is provided.
declare const process: { env: Record<string, string | undefined> };
