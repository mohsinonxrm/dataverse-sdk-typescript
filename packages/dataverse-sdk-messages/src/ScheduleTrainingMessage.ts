import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ScheduleTraining request message
 *
 * Web API Action: ScheduleTraining
 */
export class ScheduleTrainingRequest
  extends OrganizationRequest
  implements Executable<ScheduleTrainingResponse>
{
  constructor(
    public msdyn_aiconfigurationId: string,
    public version: string
  ) {
    super("ScheduleTraining");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.ScheduleTraining`;

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

  async parseResponse(response: Response): Promise<ScheduleTrainingResponse> {
    const data = await response.json();
    return ScheduleTrainingResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_aiconfigurationId,
      version: this.version,
    };
  }
}

/**
 * ScheduleTraining response message
 */
export class ScheduleTrainingResponse extends OrganizationResponse {
  constructor(public result: ScheduleTrainingResponse) {
    super("ScheduleTraining");
  }

  static fromResponse(data: unknown): ScheduleTrainingResponse {
    return new ScheduleTrainingResponse((data as any).value);
  }
}
