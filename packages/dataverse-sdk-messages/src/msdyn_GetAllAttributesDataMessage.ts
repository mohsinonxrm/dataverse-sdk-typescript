import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetAllAttributesData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAllAttributesDataRequestParameters {
  PredictionName: string;
  PredictionType: string;
}

/**
 * msdyn_GetAllAttributesData request message
 *
 * Web API Action: msdyn_GetAllAttributesData
 */
export class msdyn_GetAllAttributesDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAllAttributesDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAllAttributesDataRequestParameters>;

  constructor(parameters: msdyn_GetAllAttributesDataRequestParameters) {
    super("msdyn_GetAllAttributesData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAllAttributesData`;

    const body = requestBody({
      PredictionName: this.Parameters.PredictionName,
      PredictionType: this.Parameters.PredictionType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAllAttributesDataResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetAllAttributesDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAllAttributesData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAllAttributesDataResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_GetAllAttributesData response message
 *
 * `result` is the value the msdyn_GetAllAttributesData action returns (see {@link msdyn_GetAllAttributesDataResult}).
 */
export class msdyn_GetAllAttributesDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAllAttributesDataResult) {
    super("msdyn_GetAllAttributesData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAllAttributesDataResponse {
    return new msdyn_GetAllAttributesDataResponse(data as msdyn_GetAllAttributesDataResult);
  }
}
