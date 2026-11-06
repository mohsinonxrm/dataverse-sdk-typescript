import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonyVoiceChannelProvisionActionResponse as msdyn_TelephonyVoiceChannelProvisionActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TelephonyVoiceChannelProvisionAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyVoiceChannelProvisionActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyVoiceChannelProvisionAction request message
 *
 * Web API Action: msdyn_TelephonyVoiceChannelProvisionAction
 *
 * The first argument is the id of the msdyn_ocvoicechannelsetting record to call it on.
 */
export class msdyn_TelephonyVoiceChannelProvisionActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyVoiceChannelProvisionActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyVoiceChannelProvisionActionRequestParameters>;

  constructor(
    public msdyn_ocvoicechannelsettingId: string,
    parameters: msdyn_TelephonyVoiceChannelProvisionActionRequestParameters
  ) {
    super("msdyn_TelephonyVoiceChannelProvisionAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocvoicechannelsettings(${this.msdyn_ocvoicechannelsettingId})/Microsoft.Dynamics.CRM.msdyn_TelephonyVoiceChannelProvisionAction`;

    const body = requestBody({
      ActionRequest: this.Parameters.ActionRequest,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_TelephonyVoiceChannelProvisionActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TelephonyVoiceChannelProvisionActionResponse.fromResponse({});
    return msdyn_TelephonyVoiceChannelProvisionActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_TelephonyVoiceChannelProvisionAction response message
 */
export class msdyn_TelephonyVoiceChannelProvisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyVoiceChannelProvisionActionResponseData) {
    super("msdyn_TelephonyVoiceChannelProvisionAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyVoiceChannelProvisionActionResponse {
    return new msdyn_TelephonyVoiceChannelProvisionActionResponse(
      responseObject<msdyn_TelephonyVoiceChannelProvisionActionResponseData>(data)
    );
  }
}
