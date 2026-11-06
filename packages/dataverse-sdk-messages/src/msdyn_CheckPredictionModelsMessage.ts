import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckPredictionModels message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckPredictionModelsRequestParameters {
  PredictionType: string;
}

/**
 * msdyn_CheckPredictionModels request message
 *
 * Web API Action: msdyn_CheckPredictionModels
 */
export class msdyn_CheckPredictionModelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckPredictionModelsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckPredictionModelsRequestParameters>;

  constructor(parameters: msdyn_CheckPredictionModelsRequestParameters) {
    super("msdyn_CheckPredictionModels", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckPredictionModels`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<msdyn_CheckPredictionModelsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckPredictionModelsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckPredictionModels action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckPredictionModelsResult {
  "@odata.context"?: string;
  Exists: string;
}

/**
 * msdyn_CheckPredictionModels response message
 *
 * `result` is the value the msdyn_CheckPredictionModels action returns (see {@link msdyn_CheckPredictionModelsResult}).
 */
export class msdyn_CheckPredictionModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckPredictionModelsResult) {
    super("msdyn_CheckPredictionModels");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckPredictionModelsResponse {
    return new msdyn_CheckPredictionModelsResponse(data as msdyn_CheckPredictionModelsResult);
  }
}
