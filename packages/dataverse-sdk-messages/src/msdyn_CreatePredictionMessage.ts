import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CreatePrediction request message
 *
 * Web API Action: msdyn_CreatePrediction
 */
export class msdyn_CreatePredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreatePredictionResponse>
{
  constructor(public modelState: string) {
    super("msdyn_CreatePrediction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreatePrediction`;

    const body: Record<string, unknown> = {
      ModelState: this.modelState,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CreatePredictionResponse> {
    // No return value (204 No Content)
    return new msdyn_CreatePredictionResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ModelState: this.modelState,
    };
  }
}

/**
 * msdyn_CreatePrediction response message
 */
export class msdyn_CreatePredictionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CreatePrediction");
  }

  static fromResponse(_data: unknown): msdyn_CreatePredictionResponse {
    return new msdyn_CreatePredictionResponse();
  }
}
