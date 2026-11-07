import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetFeatureControlStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFeatureControlStatusRequestParameters {
  msdyn_featureName: string;
}

/**
 * msdyn_GetFeatureControlStatus request message
 *
 * Web API Action: msdyn_GetFeatureControlStatus
 */
export class msdyn_GetFeatureControlStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFeatureControlStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetFeatureControlStatusRequestParameters>;

  constructor(parameters: msdyn_GetFeatureControlStatusRequestParameters) {
    super("msdyn_GetFeatureControlStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFeatureControlStatus`;

    const body = requestBody({
      msdyn_featureName: this.Parameters.msdyn_featureName,
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

  async parseResponse(response: Response): Promise<msdyn_GetFeatureControlStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetFeatureControlStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetFeatureControlStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetFeatureControlStatusResult {
  "@odata.context"?: string;
  msdyn_isFeatureEnabled: boolean;
}

/**
 * msdyn_GetFeatureControlStatus response message
 *
 * `result` is the value the msdyn_GetFeatureControlStatus action returns (see {@link msdyn_GetFeatureControlStatusResult}).
 */
export class msdyn_GetFeatureControlStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFeatureControlStatusResult) {
    super("msdyn_GetFeatureControlStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetFeatureControlStatusResponse {
    return new msdyn_GetFeatureControlStatusResponse(data as msdyn_GetFeatureControlStatusResult);
  }
}
