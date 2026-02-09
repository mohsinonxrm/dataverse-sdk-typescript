import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<UnscheduleTrainingResponse> {
    const data = await response.json();
    return UnscheduleTrainingResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_aiconfigurationId,
      version: this.version,
    };
  }
}

/**
 * UnscheduleTraining response message
 */
export class UnscheduleTrainingResponse extends OrganizationResponse {
  constructor(public result: UnscheduleTrainingResponse) {
    super("UnscheduleTraining");
  }

  static fromResponse(data: unknown): UnscheduleTrainingResponse {
    return new UnscheduleTrainingResponse((data as any).value);
  }
}
