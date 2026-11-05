import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateAutoCaptureSettings request message
 *
 * Web API Action: msdyn_UpdateAutoCaptureSettings
 */
export class msdyn_UpdateAutoCaptureSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateAutoCaptureSettingsResponse>
{
  constructor(
    public actiontype: number,
    public dialogtype: number,
    public businessProcessFlowId: string,
    public businessProcessFlowInstanceId: string,
    public actionStepId: string
  ) {
    super("msdyn_UpdateAutoCaptureSettings");
  }

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
    return msdyn_UpdateAutoCaptureSettingsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      actiontype: this.actiontype,
      dialogtype: this.dialogtype,
      BusinessProcessFlowId: this.businessProcessFlowId,
      BusinessProcessFlowInstanceId: this.businessProcessFlowInstanceId,
      ActionStepId: this.actionStepId,
    };
  }
}

/**
 * msdyn_UpdateAutoCaptureSettings response message
 */
export class msdyn_UpdateAutoCaptureSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateAutoCaptureSettingsResponse) {
    super("msdyn_UpdateAutoCaptureSettings");
  }

  static fromResponse(data: unknown): msdyn_UpdateAutoCaptureSettingsResponse {
    return new msdyn_UpdateAutoCaptureSettingsResponse((data as any).value);
  }
}
