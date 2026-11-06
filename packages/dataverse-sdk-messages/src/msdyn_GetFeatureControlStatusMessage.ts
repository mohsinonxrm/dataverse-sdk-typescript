import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetFeatureControlStatusResponse as msdyn_GetFeatureControlStatusResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetFeatureControlStatusResponse.fromResponse({});
    return msdyn_GetFeatureControlStatusResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetFeatureControlStatus response message
 */
export class msdyn_GetFeatureControlStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFeatureControlStatusResponseData) {
    super("msdyn_GetFeatureControlStatus");
  }

  static fromResponse(data: unknown): msdyn_GetFeatureControlStatusResponse {
    return new msdyn_GetFeatureControlStatusResponse(
      responseObject<msdyn_GetFeatureControlStatusResponseData>(data)
    );
  }
}
