/**
 * Preview deployments: a pull request that changes the site is deployed to an Azure Static Web
 * Apps preview environment (`.github/workflows/site.yml`, docs/site.md). Sign-in there needs the
 * preview's own URL as a redirect URI of the app registration (they can't be wildcards), so the
 * app says that a preview is for demo mode.
 */

/** The production site. */
export const SITE_URL = "https://dataverse-sdk.mohsinonxrm.com";

/**
 * Whether `hostname` is a Static Web Apps preview environment rather than production:
 * `<app>-<pr>.<region>.azurestaticapps.net` (or `<app>-<pr>.<region>.<n>.azurestaticapps.net`),
 * where production is `<app>.azurestaticapps.net` or `<app>.<n>.azurestaticapps.net`. The custom
 * domain, `localhost` and any other host aren't previews.
 */
export function isPreviewHost(hostname: string): boolean {
  const labels = hostname.toLowerCase().replace(/\.$/, "").split(".");
  if (labels.length < 4 || labels.slice(-2).join(".") !== "azurestaticapps.net") return false;
  // A region (letters first, as in westeurope or eastus2) after the app's name; production has
  // none, or a partition number.
  return /^[a-z][a-z0-9]*$/.test(labels[1] ?? "");
}

/** Whether this page is a preview deployment. */
export const isPreview = (): boolean =>
  typeof window !== "undefined" && isPreviewHost(window.location.hostname);
