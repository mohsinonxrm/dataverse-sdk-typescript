import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ExecuteCopilotServiceJob action
 */
export interface msdyn_ExecuteCopilotServiceJobResponse {
  msdyn_Response: string;
}

/**
 * msdyn_ExecuteCopilotServiceJob action
 *
 * Unbound action
 */
export class msdyn_ExecuteCopilotServiceJobAction implements Executable<msdyn_ExecuteCopilotServiceJobResponse> {
  constructor(
    public readonly msdyn_JobPayload: string,
    public readonly msdyn_JobType: number,
    public readonly msdyn_AuthFlowType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteCopilotServiceJob`;

    const body: Record<string, unknown> = {
      msdyn_JobPayload: this.msdyn_JobPayload,
      msdyn_JobType: this.msdyn_JobType,
      msdyn_AuthFlowType: this.msdyn_AuthFlowType,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteCopilotServiceJobResponse> {
    const data = await response.json();
    return data as msdyn_ExecuteCopilotServiceJobResponse;
  }
}
