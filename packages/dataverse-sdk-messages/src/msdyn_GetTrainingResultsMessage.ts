import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetTrainingResults message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetTrainingResultsRequestParameters {
  PredictionName?: string;
}

/**
 * msdyn_GetTrainingResults request message
 *
 * Web API Action: msdyn_GetTrainingResults
 */
export class msdyn_GetTrainingResultsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetTrainingResultsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetTrainingResultsRequestParameters>;

  constructor(parameters: msdyn_GetTrainingResultsRequestParameters = {}) {
    super("msdyn_GetTrainingResults", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTrainingResults`;

    const body = requestBody({
      PredictionName: this.Parameters.PredictionName,
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

  async parseResponse(response: Response): Promise<msdyn_GetTrainingResultsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetTrainingResultsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetTrainingResults action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetTrainingResultsResult {
  "@odata.context"?: string;
  TrainingResults: string;
}

/**
 * msdyn_GetTrainingResults response message
 *
 * `result` is the value the msdyn_GetTrainingResults action returns (see {@link msdyn_GetTrainingResultsResult}).
 */
export class msdyn_GetTrainingResultsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetTrainingResultsResult) {
    super("msdyn_GetTrainingResults");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetTrainingResultsResponse {
    return new msdyn_GetTrainingResultsResponse(data as msdyn_GetTrainingResultsResult);
  }
}
