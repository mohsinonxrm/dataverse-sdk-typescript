import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the RetrieveAppsWithDelegatedAccessPermissions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAppsWithDelegatedAccessPermissionsRequestParameters {
  cloud: number;
}

/**
 * RetrieveAppsWithDelegatedAccessPermissions request message
 *
 * Web API Action: RetrieveAppsWithDelegatedAccessPermissions
 */
export class RetrieveAppsWithDelegatedAccessPermissionsRequest
  extends OrganizationRequest
  implements Executable<RetrieveAppsWithDelegatedAccessPermissionsResponse>
{
  declare readonly Parameters: Readonly<RetrieveAppsWithDelegatedAccessPermissionsRequestParameters>;

  constructor(parameters: RetrieveAppsWithDelegatedAccessPermissionsRequestParameters) {
    super("RetrieveAppsWithDelegatedAccessPermissions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RetrieveAppsWithDelegatedAccessPermissions`;

    const body = requestBody({
      cloud: this.Parameters.cloud,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<RetrieveAppsWithDelegatedAccessPermissionsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return RetrieveAppsWithDelegatedAccessPermissionsResponse.fromResponse({});
    return RetrieveAppsWithDelegatedAccessPermissionsResponse.fromResponse(await response.json());
  }
}

/**
 * RetrieveAppsWithDelegatedAccessPermissions response message
 */
export class RetrieveAppsWithDelegatedAccessPermissionsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("RetrieveAppsWithDelegatedAccessPermissions");
  }

  static fromResponse(data: unknown): RetrieveAppsWithDelegatedAccessPermissionsResponse {
    return new RetrieveAppsWithDelegatedAccessPermissionsResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
