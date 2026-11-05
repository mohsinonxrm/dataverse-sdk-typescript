import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_UpdateAutoCaptureSettingsResponse as msdyn_UpdateAutoCaptureSettingsResponseData } from "./types/index.js";

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
}

/**
 * msdyn_UpdateAutoCaptureSettings response message
 */
export class msdyn_UpdateAutoCaptureSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateAutoCaptureSettingsResponseData) {
    super("msdyn_UpdateAutoCaptureSettings");
  }

  static fromResponse(data: unknown): msdyn_UpdateAutoCaptureSettingsResponse {
    return new msdyn_UpdateAutoCaptureSettingsResponse(
      responseObject<msdyn_UpdateAutoCaptureSettingsResponseData>(data)
    );
  }
}
