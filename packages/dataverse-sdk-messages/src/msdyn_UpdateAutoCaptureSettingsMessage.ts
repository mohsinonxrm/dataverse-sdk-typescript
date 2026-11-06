import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpdateAutoCaptureSettingsResponse as msdyn_UpdateAutoCaptureSettingsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_UpdateAutoCaptureSettings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateAutoCaptureSettingsRequestParameters {
  actiontype: number;
  dialogtype?: number;
  BusinessProcessFlowId?: string;
  BusinessProcessFlowInstanceId?: string;
  ActionStepId?: string;
}

/**
 * msdyn_UpdateAutoCaptureSettings request message
 *
 * Web API Action: msdyn_UpdateAutoCaptureSettings
 */
export class msdyn_UpdateAutoCaptureSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateAutoCaptureSettingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateAutoCaptureSettingsRequestParameters>;

  constructor(parameters: msdyn_UpdateAutoCaptureSettingsRequestParameters) {
    super("msdyn_UpdateAutoCaptureSettings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateAutoCaptureSettings`;

    const body = requestBody({
      actiontype: this.Parameters.actiontype,
      dialogtype: this.Parameters.dialogtype,
      BusinessProcessFlowId: this.Parameters.BusinessProcessFlowId,
      BusinessProcessFlowInstanceId: this.Parameters.BusinessProcessFlowInstanceId,
      ActionStepId: this.Parameters.ActionStepId,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_UpdateAutoCaptureSettingsResponse.fromResponse(text ? JSON.parse(text) : {});
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
