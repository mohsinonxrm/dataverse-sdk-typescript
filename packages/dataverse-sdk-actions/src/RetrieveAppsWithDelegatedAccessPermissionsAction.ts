import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveAppsWithDelegatedAccessPermissions action
 */
export interface RetrieveAppsWithDelegatedAccessPermissionsResponse {
  value: EntityReference[];
}

/**
 * RetrieveAppsWithDelegatedAccessPermissions action
 *
 * Unbound action
 */
export class RetrieveAppsWithDelegatedAccessPermissionsAction implements Executable<RetrieveAppsWithDelegatedAccessPermissionsResponse> {
  constructor(public readonly cloud: number) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveAppsWithDelegatedAccessPermissions`;

    const body: Record<string, unknown> = {
      cloud: this.cloud,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<RetrieveAppsWithDelegatedAccessPermissionsResponse> {
    const data = await response.json();
    return data as RetrieveAppsWithDelegatedAccessPermissionsResponse;
  }
}
