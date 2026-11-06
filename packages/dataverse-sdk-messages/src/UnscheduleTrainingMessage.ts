import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { UnscheduleTrainingResponse as UnscheduleTrainingResponseData } from "./types/index.js";

/**
 * UnscheduleTraining request message
 *
 * Web API Action: UnscheduleTraining
 */
export class UnscheduleTrainingRequest
  extends OrganizationRequest
  implements Executable<UnscheduleTrainingResponse>
{
  constructor(
    public msdyn_aiconfigurationId: string,
    public version: string
  ) {
    super("UnscheduleTraining");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.UnscheduleTraining`;

    const body: Record<string, unknown> = {
      version: this.version,
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

  async parseResponse(response: Response): Promise<UnscheduleTrainingResponse> {
    const data = await response.json();
    return UnscheduleTrainingResponse.fromResponse(data);
  }
}

/**
 * UnscheduleTraining response message
 */
export class UnscheduleTrainingResponse extends OrganizationResponse {
  constructor(public result: UnscheduleTrainingResponseData) {
    super("UnscheduleTraining");
  }

  static fromResponse(data: unknown): UnscheduleTrainingResponse {
    return new UnscheduleTrainingResponse(responseObject<UnscheduleTrainingResponseData>(data));
  }
}
