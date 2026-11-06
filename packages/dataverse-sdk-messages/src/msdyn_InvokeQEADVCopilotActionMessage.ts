import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_InvokeQEADVCopilotActionResponse as msdyn_InvokeQEADVCopilotActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_InvokeQEADVCopilotAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeQEADVCopilotActionRequestParameters {
  action: string;
}

/**
 * msdyn_InvokeQEADVCopilotAction request message
 *
 * Web API Action: msdyn_InvokeQEADVCopilotAction
 */
export class msdyn_InvokeQEADVCopilotActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeQEADVCopilotActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeQEADVCopilotActionRequestParameters>;

  constructor(parameters: msdyn_InvokeQEADVCopilotActionRequestParameters) {
    super("msdyn_InvokeQEADVCopilotAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeQEADVCopilotAction`;

    const body = requestBody({
      action: this.Parameters.action,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeQEADVCopilotActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_InvokeQEADVCopilotActionResponse.fromResponse({});
    return msdyn_InvokeQEADVCopilotActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_InvokeQEADVCopilotAction response message
 */
export class msdyn_InvokeQEADVCopilotActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeQEADVCopilotActionResponseData) {
    super("msdyn_InvokeQEADVCopilotAction");
  }

  static fromResponse(data: unknown): msdyn_InvokeQEADVCopilotActionResponse {
    return new msdyn_InvokeQEADVCopilotActionResponse(
      responseObject<msdyn_InvokeQEADVCopilotActionResponseData>(data)
    );
  }
}
