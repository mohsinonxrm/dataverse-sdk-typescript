/**
 * Sign-in settings: the environment URL and the Microsoft Entra app registration to sign in with.
 *
 * Visitors type them on the sign-in page; they are kept in `localStorage` (none of them is a
 * secret). The `VITE_*` variables in `.env` (see `.env.example`), or the deploy workflow's
 * repository variables, give the defaults. Without them the app still runs, in demo mode, against
 * an in-browser fake of the Web API.
 */
import { readLocal, writeLocal } from "./lib/storage";

export interface ConnectionSettings {
  /** Dataverse environment URL, e.g. `https://contoso.crm.dynamics.com`. */
  environmentUrl: string;
  /** Application (client) id of a single-page-application app registration. */
  clientId: string;
  /** Directory (tenant) id or domain; `organizations` for any work or school account. */
  tenantId: string;
}

const env = import.meta.env;

/** The defaults from the build's `VITE_*` variables. */
export const defaultSettings: ConnectionSettings = {
  environmentUrl: normalizeUrl(env.VITE_DATAVERSE_URL ?? ""),
  clientId: env.VITE_AZURE_CLIENT_ID?.trim() ?? "",
  tenantId: env.VITE_AZURE_TENANT_ID?.trim() || "organizations",
};

/** The redirect URI registered on the app registration: the page's origin unless `.env` says otherwise. */
export function redirectUri(): string {
  return (
    env.VITE_AZURE_REDIRECT_URI?.trim() ||
    (typeof window === "undefined" ? "" : window.location.origin)
  );
}

/** `https://contoso.crm.dynamics.com/` and `https://contoso.crm.dynamics.com/main.aspx` → the origin. */
export function normalizeUrl(url: string): string {
  const text = url.trim();
  if (!text) return "";
  try {
    return new URL(text).origin;
  } catch {
    return text.replace(/\/+$/, "");
  }
}

const SETTINGS_KEY = "explorer-connection";

/** The settings the visitor saved, over the build's defaults. */
export function readConnectionSettings(): ConnectionSettings {
  const saved = readLocal(SETTINGS_KEY);
  if (!saved) return defaultSettings;
  try {
    const value = JSON.parse(saved) as Partial<ConnectionSettings>;
    return {
      environmentUrl:
        typeof value.environmentUrl === "string"
          ? value.environmentUrl
          : defaultSettings.environmentUrl,
      clientId: typeof value.clientId === "string" ? value.clientId : defaultSettings.clientId,
      tenantId:
        typeof value.tenantId === "string" && value.tenantId
          ? value.tenantId
          : defaultSettings.tenantId,
    };
  } catch {
    return defaultSettings;
  }
}

export function writeConnectionSettings(settings: ConnectionSettings): void {
  writeLocal(SETTINGS_KEY, JSON.stringify(settings));
}

const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * The problems with `settings`, by field; empty when sign-in can start. The environment must be a
 * public-cloud Dataverse URL: the site's Content-Security-Policy (`staticwebapp.config.json`)
 * allows requests to `*.dynamics.com` only.
 */
export function validateSettings(
  settings: ConnectionSettings
): Partial<Record<keyof ConnectionSettings, string>> {
  const errors: Partial<Record<keyof ConnectionSettings, string>> = {};
  let url: URL | undefined;
  try {
    url = new URL(settings.environmentUrl.trim());
  } catch {
    // Reported below.
  }
  if (!settings.environmentUrl.trim()) {
    errors.environmentUrl = "Enter your environment's URL.";
  } else if (!url || url.protocol !== "https:") {
    errors.environmentUrl = "Enter an https:// URL, such as https://contoso.crm.dynamics.com.";
  } else if (!/\.dynamics\.com$/i.test(url.hostname)) {
    errors.environmentUrl =
      "Enter a Dataverse environment URL ending in .dynamics.com, such as https://contoso.crm.dynamics.com.";
  }
  if (!settings.clientId.trim()) {
    errors.clientId = "Enter the application (client) id of your app registration.";
  } else if (!GUID.test(settings.clientId.trim())) {
    errors.clientId = "The client id is a GUID, such as 00000000-0000-0000-0000-000000000000.";
  }
  if (!/^[\w.-]+$/.test(settings.tenantId.trim() || "organizations")) {
    errors.tenantId =
      "Enter a tenant id, a domain such as contoso.onmicrosoft.com, or organizations.";
  }
  return errors;
}

/** Whether the settings are complete and valid. */
export function canSignIn(settings: ConnectionSettings): boolean {
  return Object.keys(validateSettings(settings)).length === 0;
}

/**
 * The admin consent URL for the app registration: a tenant admin opens it once to grant the
 * Dataverse `user_impersonation` permission for everyone, in tenants where users can't consent.
 */
export function adminConsentUrl(settings: ConnectionSettings): string {
  const tenant = encodeURIComponent(settings.tenantId.trim() || "organizations");
  const query = new URLSearchParams({
    client_id: settings.clientId.trim(),
    redirect_uri: redirectUri(),
  });
  return `https://login.microsoftonline.com/${tenant}/adminconsent?${query.toString()}`;
}

/** The site's name, in the header and the page titles. */
export const APP_NAME = "Dataverse SDK explorer";

/** The environment the demo mode pretends to be. */
export const DEMO_ENVIRONMENT_URL = "https://contoso.crm.dynamics.com";

/** Where the SDK's source and docs live. */
export const REPO_URL = "https://github.com/mohsinonxrm/dataverse-sdk-typescript";
