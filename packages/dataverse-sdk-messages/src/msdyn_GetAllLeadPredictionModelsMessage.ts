import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetAllLeadPredictionModels request message
 *
 * Web API Action: msdyn_GetAllLeadPredictionModels
 */
export class msdyn_GetAllLeadPredictionModelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAllLeadPredictionModelsResponse>
{
  constructor() {
    super("msdyn_GetAllLeadPredictionModels");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAllLeadPredictionModels`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetAllLeadPredictionModelsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetAllLeadPredictionModelsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetAllLeadPredictionModels action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAllLeadPredictionModelsResult {
  "@odata.context"?: string;
  Predictions: string;
}

/**
 * msdyn_GetAllLeadPredictionModels response message
 *
 * `result` is the value the msdyn_GetAllLeadPredictionModels action returns (see {@link msdyn_GetAllLeadPredictionModelsResult}).
 */
export class msdyn_GetAllLeadPredictionModelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAllLeadPredictionModelsResult) {
    super("msdyn_GetAllLeadPredictionModels");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAllLeadPredictionModelsResponse {
    return new msdyn_GetAllLeadPredictionModelsResponse(
      data as msdyn_GetAllLeadPredictionModelsResult
    );
  }
}
