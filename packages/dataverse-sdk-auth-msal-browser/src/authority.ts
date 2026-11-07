/**
 * @fileoverview Entra ID authority hosts and tenant validation, shared by the provider
 * (`TokenOptions.tenantId`) and the SPA helpers (`authorityFor`).
 */

import type { AzureCloudOptions } from "@azure/msal-browser";
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

/** The request fields that send an MSAL request to a tenant. */
export interface TenantAuthority {
  authority: string;
  /**
   * Set when the application is configured with `azureCloudOptions`: MSAL then builds the
   * authority from them and ignores a request's `authority`, unless the request has its own.
   */
  azureCloudOptions?: AzureCloudOptions;
}

/** The parts of MSAL's `auth` configuration that decide the cloud. */
export interface ConfiguredAuthority {
  authority?: unknown;
  azureCloudOptions?: AzureCloudOptions;
}

function originOf(authority: unknown): string | undefined {
  if (typeof authority !== "string" || authority.length === 0) {
    return undefined;
  }
  try {
    return new URL(authority).origin;
  } catch {
    return undefined;
  }
}

/**
 * The authority for `tenant` on the application's cloud: its `azureCloudOptions` cloud, else the
 * host of its configured authority, else the public cloud. Validates the tenant first.
 */
export function tenantAuthority(
  configured: ConfiguredAuthority | undefined,
  tenant: string
): TenantAuthority {
  assertValidTenant(tenant);
  const cloud = configured?.azureCloudOptions;
  const instance: unknown = cloud?.azureCloudInstance;
  if (cloud && typeof instance === "string" && instance.length > 0 && instance !== "none") {
    return { authority: `${instance}/${tenant}`, azureCloudOptions: { ...cloud, tenant } };
  }
  return { authority: `${originOf(configured?.authority) ?? AUTHORITY_HOSTS.public}/${tenant}` };
}
