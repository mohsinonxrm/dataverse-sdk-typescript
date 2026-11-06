import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_ExecuteTransformationAPIResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ExecuteTransformationAPI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExecuteTransformationAPIResult {
  "@odata.context"?: string;
  ApiResponse: string;
}

/**
 * msdyn_ExecuteTransformationAPI response message
 *
 * `result` is the value the msdyn_ExecuteTransformationAPI action returns (see {@link msdyn_ExecuteTransformationAPIResult}).
 */
export class msdyn_ExecuteTransformationAPIResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteTransformationAPIResult) {
    super("msdyn_ExecuteTransformationAPI");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExecuteTransformationAPIResponse {
    return new msdyn_ExecuteTransformationAPIResponse(data as msdyn_ExecuteTransformationAPIResult);
  }
}
