import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CreateSimilarOpportunitiyPredictionModel request message
 *
 * Web API Action: msdyn_CreateSimilarOpportunitiyPredictionModel
 */
export class msdyn_CreateSimilarOpportunitiyPredictionModelRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateSimilarOpportunitiyPredictionModelResponse>
{
  constructor(public modelState: string) {
    super("msdyn_CreateSimilarOpportunitiyPredictionModel");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSimilarOpportunitiyPredictionModel`;

    const body: Record<string, unknown> = {
      ModelState: this.modelState,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CreateSimilarOpportunitiyPredictionModelResponse> {
    // No return value (204 No Content)
    return new msdyn_CreateSimilarOpportunitiyPredictionModelResponse();
  }
}

/**
 * msdyn_CreateSimilarOpportunitiyPredictionModel response message
 */
export class msdyn_CreateSimilarOpportunitiyPredictionModelResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CreateSimilarOpportunitiyPredictionModel");
  }

  static fromResponse(_data: unknown): msdyn_CreateSimilarOpportunitiyPredictionModelResponse {
    return new msdyn_CreateSimilarOpportunitiyPredictionModelResponse();
  }
}
