import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateAutoCaptureSettings action
 */
export interface msdyn_UpdateAutoCaptureSettingsResponse {
  settingstatus: boolean;
}

/**
 * msdyn_UpdateAutoCaptureSettings action
 *
 * Unbound action
 */
export class msdyn_UpdateAutoCaptureSettingsAction implements Executable<msdyn_UpdateAutoCaptureSettingsResponse> {
  constructor(
    public readonly actiontype: number,
    public readonly dialogtype?: number,
    public readonly businessProcessFlowId?: string,
    public readonly businessProcessFlowInstanceId?: string,
    public readonly actionStepId?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateAutoCaptureSettings`;

    const body: Record<string, unknown> = {
      actiontype: this.actiontype,
      dialogtype: this.dialogtype,
      BusinessProcessFlowId: this.businessProcessFlowId,
      BusinessProcessFlowInstanceId: this.businessProcessFlowInstanceId,
      ActionStepId: this.actionStepId,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateAutoCaptureSettingsResponse> {
    const data = await response.json();
    return data as msdyn_UpdateAutoCaptureSettingsResponse;
  }
}
