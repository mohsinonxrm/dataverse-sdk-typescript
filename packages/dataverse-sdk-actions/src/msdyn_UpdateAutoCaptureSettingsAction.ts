import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateAutoCaptureSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateAutoCaptureSettingsResponse {
  "@odata.context"?: string;
  settingstatus: boolean;
}

/**
 * Parameters of the msdyn_UpdateAutoCaptureSettings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateAutoCaptureSettingsActionParameters {
  actiontype: number;
  dialogtype?: number;
  BusinessProcessFlowId?: string;
  BusinessProcessFlowInstanceId?: string;
  ActionStepId?: string;
}

/**
 * msdyn_UpdateAutoCaptureSettings action
 *
 * Unbound action
 */
export class msdyn_UpdateAutoCaptureSettingsAction implements Executable<msdyn_UpdateAutoCaptureSettingsResponse> {
  constructor(public readonly parameters: msdyn_UpdateAutoCaptureSettingsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateAutoCaptureSettings`;

    const body = requestBody({
      actiontype: this.parameters.actiontype,
      dialogtype: this.parameters.dialogtype,
      BusinessProcessFlowId: this.parameters.BusinessProcessFlowId,
      BusinessProcessFlowInstanceId: this.parameters.BusinessProcessFlowInstanceId,
      ActionStepId: this.parameters.ActionStepId,
    });

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_UpdateAutoCaptureSettingsResponse;
  }
}
