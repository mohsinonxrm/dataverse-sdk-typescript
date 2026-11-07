import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_FetchAllPredictionModels message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchAllPredictionModelsRequestParameters {
  PredictionType: string;
}

/**
 * msdyn_FetchAllPredictionModels request message
 *
 * Web API Action: msdyn_FetchAllPredictionModels
 */
export class msdyn_FetchAllPredictionModelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchAllPredictionModelsResponse>
{
  declare readonly Parameters: Readonly<msdyn_FetchAllPredictionModelsRequestParameters>;

  constructor(parameters: msdyn_FetchAllPredictionModelsRequestParameters) {
    super("msdyn_FetchAllPredictionModels", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchAllPredictionModels`;

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

  async parseResponse(response: Response): Promise<msdyn_FetchAllPredictionModelsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_FetchAllPredictionModelsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_FetchAllPredictionModels action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FetchAllPredictionModelsResult {
  "@odata.context"?: string;
  Response: string;
}

/**
 * msdyn_FetchAllPredictionModels response message
 *
 * `result` is the value the msdyn_FetchAllPredictionModels action returns (see {@link msdyn_FetchAllPredictionModelsResult}).
 */
export class msdyn_FetchAllPredictionModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchAllPredictionModelsResult) {
    super("msdyn_FetchAllPredictionModels");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_FetchAllPredictionModelsResponse {
    return new msdyn_FetchAllPredictionModelsResponse(data as msdyn_FetchAllPredictionModelsResult);
  }
}
