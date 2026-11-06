import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_OSGetTrainingResults message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OSGetTrainingResultsRequestParameters {
  PredictionName?: string;
}

/**
 * msdyn_OSGetTrainingResults request message
 *
 * Web API Action: msdyn_OSGetTrainingResults
 */
export class msdyn_OSGetTrainingResultsRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSGetTrainingResultsResponse>
{
  declare readonly Parameters: Readonly<msdyn_OSGetTrainingResultsRequestParameters>;

  constructor(parameters: msdyn_OSGetTrainingResultsRequestParameters = {}) {
    super("msdyn_OSGetTrainingResults", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSGetTrainingResults`;

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

  async parseResponse(response: Response): Promise<msdyn_OSGetTrainingResultsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_OSGetTrainingResultsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_OSGetTrainingResults action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OSGetTrainingResultsResult {
  "@odata.context"?: string;
  TrainingResults: string;
}

/**
 * msdyn_OSGetTrainingResults response message
 *
 * `result` is the value the msdyn_OSGetTrainingResults action returns (see {@link msdyn_OSGetTrainingResultsResult}).
 */
export class msdyn_OSGetTrainingResultsResponse extends OrganizationResponse {
  constructor(public result: msdyn_OSGetTrainingResultsResult) {
    super("msdyn_OSGetTrainingResults");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_OSGetTrainingResultsResponse {
    return new msdyn_OSGetTrainingResultsResponse(data as msdyn_OSGetTrainingResultsResult);
  }
}
