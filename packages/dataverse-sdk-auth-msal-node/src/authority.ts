/**
 * @fileoverview The authority for a tenant (`tenantId`), on the cloud the MSAL application is
 * configured for, and tenant validation. Same approach as the browser package's `authority.ts`.
 */

import type { AzureCloudOptions } from "@azure/msal-node";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";

/** Public cloud sign-in host, used when the application's configuration can't be read. */
const PUBLIC_CLOUD_HOST = "https://login.microsoftonline.com";

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

/** The parts of MSAL Node's configuration (`auth`) this needs. */
interface ConfiguredAuth {
  authority?: unknown;
  azureCloudOptions?: AzureCloudOptions;
}

/**
 * MSAL Node has no public getter for an application's configuration; every supported major keeps
 * it in the (TypeScript-protected) `config` field. `undefined` when it isn't there.
 */
function configuredAuth(app: unknown): ConfiguredAuth | undefined {
  if (typeof app !== "object" || app === null) {
    return undefined;
  }
  const { config } = app as { config?: { auth?: ConfiguredAuth } };
  return typeof config === "object" ? config.auth : undefined;
}

function originOf(authority: unknown): string | undefined {
  if (typeof authority !== "string") {
    return undefined;
  }
  try {
    return new URL(authority).origin;
  } catch {
    return undefined;
  }
}

/**
 * The authority for `tenant` on the host of the application's configured authority (or its
 * `azureCloudOptions` cloud), so a US Government or China app stays in its cloud. Validates the
 * tenant first.
 */
export function tenantAuthority(app: unknown, tenant: string): TenantAuthority {
  assertValidTenant(tenant);
  const auth = configuredAuth(app);
  const cloud = auth?.azureCloudOptions;
  const instance: unknown = cloud?.azureCloudInstance;
  if (cloud && typeof instance === "string" && instance.length > 0 && instance !== "none") {
    return { authority: `${instance}/${tenant}`, azureCloudOptions: { ...cloud, tenant } };
  }
  return { authority: `${originOf(auth?.authority) ?? PUBLIC_CLOUD_HOST}/${tenant}` };
}
