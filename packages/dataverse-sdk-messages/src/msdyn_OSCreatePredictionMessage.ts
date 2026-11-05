import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OSCreatePrediction request message
 *
 * Web API Action: msdyn_OSCreatePrediction
 */
export class msdyn_OSCreatePredictionRequest
  extends OrganizationRequest
  implements Executable<msdyn_OSCreatePredictionResponse>
{
  constructor(public modelState: string) {
    super("msdyn_OSCreatePrediction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OSCreatePrediction`;

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

  async parseResponse(response: Response): Promise<msdyn_OSCreatePredictionResponse> {
    // No return value (204 No Content)
    return new msdyn_OSCreatePredictionResponse();
  }
}

/**
 * msdyn_OSCreatePrediction response message
 */
export class msdyn_OSCreatePredictionResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_OSCreatePrediction");
  }

  static fromResponse(_data: unknown): msdyn_OSCreatePredictionResponse {
    return new msdyn_OSCreatePredictionResponse();
  }
}
