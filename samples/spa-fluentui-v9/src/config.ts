/**
 * MSAL Configuration for SPA
 */

import type { Configuration, RedirectRequest } from "@azure/msal-browser";
import { authorityFor, scopesForEnvironment } from "@mohsinonxrm/dataverse-sdk-auth-msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || "",
    authority: authorityFor("public", import.meta.env.VITE_AZURE_TENANT_ID || "organizations"),
    redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI || "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage",
  },
};

export const dataverseUrl = import.meta.env.VITE_DATAVERSE_URL || "";

export const loginRequest: RedirectRequest = {
  scopes: dataverseUrl ? scopesForEnvironment(dataverseUrl) : [],
};
