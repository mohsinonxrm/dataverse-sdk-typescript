/**
 * MSAL Configuration for SPA
 */

import { Configuration, RedirectRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID || "organizations"}`,
    redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI || "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest: RedirectRequest = {
  scopes: [`${import.meta.env.VITE_DATAVERSE_URL}/user_impersonation`],
};

export const dataverseUrl = import.meta.env.VITE_DATAVERSE_URL || "";
