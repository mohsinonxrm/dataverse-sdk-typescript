import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonyVoiceChannelProvisionActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TelephonyVoiceChannelProvisionAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonyVoiceChannelProvisionActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonyVoiceChannelProvisionAction response message
 *
 * `result` is the value the msdyn_TelephonyVoiceChannelProvisionAction action returns (see {@link msdyn_TelephonyVoiceChannelProvisionActionResult}).
 */
export class msdyn_TelephonyVoiceChannelProvisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyVoiceChannelProvisionActionResult) {
    super("msdyn_TelephonyVoiceChannelProvisionAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonyVoiceChannelProvisionActionResponse {
    return new msdyn_TelephonyVoiceChannelProvisionActionResponse(
      data as msdyn_TelephonyVoiceChannelProvisionActionResult
    );
  }
}
