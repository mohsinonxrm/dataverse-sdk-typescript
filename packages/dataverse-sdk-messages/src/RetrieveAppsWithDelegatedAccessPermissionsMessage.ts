import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * RetrieveAppsWithDelegatedAccessPermissions request message
 *
 * Web API Action: RetrieveAppsWithDelegatedAccessPermissions
 */
export class RetrieveAppsWithDelegatedAccessPermissionsRequest
  extends OrganizationRequest
  implements Executable<RetrieveAppsWithDelegatedAccessPermissionsResponse>
{
  constructor(public cloud: number) {
    super("RetrieveAppsWithDelegatedAccessPermissions");
  }

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
    return RetrieveAppsWithDelegatedAccessPermissionsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      cloud: this.cloud,
    };
  }
}

/**
 * RetrieveAppsWithDelegatedAccessPermissions response message
 */
export class RetrieveAppsWithDelegatedAccessPermissionsResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("RetrieveAppsWithDelegatedAccessPermissions");
  }

  static fromResponse(data: unknown): RetrieveAppsWithDelegatedAccessPermissionsResponse {
    return new RetrieveAppsWithDelegatedAccessPermissionsResponse((data as any).value);
  }
}
