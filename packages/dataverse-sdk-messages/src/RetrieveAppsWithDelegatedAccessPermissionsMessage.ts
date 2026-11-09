import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveAppsWithDelegatedAccessPermissionsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveAppsWithDelegatedAccessPermissionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAppsWithDelegatedAccessPermissions action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveAppsWithDelegatedAccessPermissionsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrieveAppsWithDelegatedAccessPermissions response message
 *
 * `result` is the value the RetrieveAppsWithDelegatedAccessPermissions action returns (see {@link RetrieveAppsWithDelegatedAccessPermissionsResult}).
 */
export class RetrieveAppsWithDelegatedAccessPermissionsResponse extends OrganizationResponse {
  constructor(public result: RetrieveAppsWithDelegatedAccessPermissionsResult) {
    super("RetrieveAppsWithDelegatedAccessPermissions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAppsWithDelegatedAccessPermissionsResponse {
    return new RetrieveAppsWithDelegatedAccessPermissionsResponse(
      data === undefined
        ? []
        : (data as { value: RetrieveAppsWithDelegatedAccessPermissionsResult }).value
    );
  }
}
