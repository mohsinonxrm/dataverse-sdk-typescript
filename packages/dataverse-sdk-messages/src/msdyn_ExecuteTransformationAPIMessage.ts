import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ExecuteTransformationAPIResponse as msdyn_ExecuteTransformationAPIResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ExecuteTransformationAPI message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteTransformationAPIRequestParameters {
  ApiName: string;
  ApiPayload: string;
}

/**
 * msdyn_ExecuteTransformationAPI request message
 *
 * Web API Action: msdyn_ExecuteTransformationAPI
 */
export class msdyn_ExecuteTransformationAPIRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteTransformationAPIResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteTransformationAPIRequestParameters>;

  constructor(parameters: msdyn_ExecuteTransformationAPIRequestParameters) {
    super("msdyn_ExecuteTransformationAPI", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteTransformationAPI`;

    const body = requestBody({
      ApiName: this.Parameters.ApiName,
      ApiPayload: this.Parameters.ApiPayload,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteTransformationAPIResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ExecuteTransformationAPIResponse.fromResponse({});
    return msdyn_ExecuteTransformationAPIResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ExecuteTransformationAPI response message
 */
export class msdyn_ExecuteTransformationAPIResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteTransformationAPIResponseData) {
    super("msdyn_ExecuteTransformationAPI");
  }

  static fromResponse(data: unknown): msdyn_ExecuteTransformationAPIResponse {
    return new msdyn_ExecuteTransformationAPIResponse(
      responseObject<msdyn_ExecuteTransformationAPIResponseData>(data)
    );
  }
}
