/**
 * Settings read from the `VITE_*` variables in `.env` (see `.env.example`).
 *
 * Sign-in with Microsoft needs a client id and an environment URL. Without them the app still
 * runs, in demo mode only, against an in-browser fake of the Web API.
 */
export const settings = {
  clientId: import.meta.env.VITE_AZURE_CLIENT_ID?.trim() ?? "",
  tenantId: import.meta.env.VITE_AZURE_TENANT_ID?.trim() || "organizations",
  redirectUri:
    import.meta.env.VITE_AZURE_REDIRECT_URI?.trim() ||
    (typeof window === "undefined" ? "" : window.location.origin),
  environmentUrl: import.meta.env.VITE_DATAVERSE_URL?.trim().replace(/\/+$/, "") ?? "",
};

/** Whether the `.env` settings that Microsoft sign-in needs are present. */
export const isMsalConfigured = settings.clientId !== "" && settings.environmentUrl !== "";

/** The environment the demo mode pretends to be. */
export const DEMO_ENVIRONMENT_URL = "https://contoso.crm.dynamics.com";
