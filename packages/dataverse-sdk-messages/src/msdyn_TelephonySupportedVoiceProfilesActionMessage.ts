import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_TelephonySupportedVoiceProfilesAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonySupportedVoiceProfilesActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonySupportedVoiceProfilesAction request message
 *
 * Web API Action: msdyn_TelephonySupportedVoiceProfilesAction
 */
export class msdyn_TelephonySupportedVoiceProfilesActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonySupportedVoiceProfilesActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonySupportedVoiceProfilesActionRequestParameters>;

  constructor(parameters: msdyn_TelephonySupportedVoiceProfilesActionRequestParameters) {
    super("msdyn_TelephonySupportedVoiceProfilesAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonySupportedVoiceProfilesAction`;

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
  ): Promise<msdyn_TelephonySupportedVoiceProfilesActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TelephonySupportedVoiceProfilesActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TelephonySupportedVoiceProfilesAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TelephonySupportedVoiceProfilesActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_TelephonySupportedVoiceProfilesAction response message
 *
 * `result` is the value the msdyn_TelephonySupportedVoiceProfilesAction action returns (see {@link msdyn_TelephonySupportedVoiceProfilesActionResult}).
 */
export class msdyn_TelephonySupportedVoiceProfilesActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonySupportedVoiceProfilesActionResult) {
    super("msdyn_TelephonySupportedVoiceProfilesAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TelephonySupportedVoiceProfilesActionResponse {
    return new msdyn_TelephonySupportedVoiceProfilesActionResponse(
      data as msdyn_TelephonySupportedVoiceProfilesActionResult
    );
  }
}
