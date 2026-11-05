/**
 * @fileoverview Entra ID authority hosts and tenant validation, shared by the provider
 * (`TokenOptions.tenantId`) and the SPA helpers (`authorityFor`).
 */

import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";

/** Microsoft Entra ID clouds. */
export type EntraCloud = "public" | "usgov" | "usgovdod" | "china";

/** Sign-in host of each cloud. US Government (GCC High) and DoD share `login.microsoftonline.us`. */
export const AUTHORITY_HOSTS: Readonly<Record<EntraCloud, string>> = {
  public: "https://login.microsoftonline.com",
  usgov: "https://login.microsoftonline.us",
  usgovdod: "https://login.microsoftonline.us",
  china: "https://login.partner.microsoftonline.cn",
};

/** A tenant id (GUID), a tenant domain such as `contoso.onmicrosoft.com`, or `organizations` etc. */
const TENANT_PATTERN = /^[A-Za-z0-9][A-Za-z0-9.-]*$/;

/**
 * Throws `DataverseInvalidRequestError` (`name: "InvalidTenantId"`) unless `tenant` is a tenant
 * id, a tenant domain, or a keyword such as `organizations`. Keeps paths and queries out of the
 * authority URL.
 */
export function assertValidTenant(tenant: string): void {
  if (!TENANT_PATTERN.test(tenant)) {
    const error = new DataverseInvalidRequestError(
      `Invalid tenantId: expected a tenant id (GUID) or domain, got "${tenant}"`
    );
    error.name = "InvalidTenantId";
    throw error;
  }
}
