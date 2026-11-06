import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_UpdateAutoCaptureSettingsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpdateAutoCaptureSettings action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateAutoCaptureSettingsResult {
  "@odata.context"?: string;
  settingstatus: boolean;
}

/**
 * msdyn_UpdateAutoCaptureSettings response message
 *
 * `result` is the value the msdyn_UpdateAutoCaptureSettings action returns (see {@link msdyn_UpdateAutoCaptureSettingsResult}).
 */
export class msdyn_UpdateAutoCaptureSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateAutoCaptureSettingsResult) {
    super("msdyn_UpdateAutoCaptureSettings");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpdateAutoCaptureSettingsResponse {
    return new msdyn_UpdateAutoCaptureSettingsResponse(
      data as msdyn_UpdateAutoCaptureSettingsResult
    );
  }
}
