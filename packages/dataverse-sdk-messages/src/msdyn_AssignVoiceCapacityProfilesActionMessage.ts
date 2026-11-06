import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AssignVoiceCapacityProfilesAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AssignVoiceCapacityProfilesActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_AssignVoiceCapacityProfilesAction request message
 *
 * Web API Action: msdyn_AssignVoiceCapacityProfilesAction
 */
export class msdyn_AssignVoiceCapacityProfilesActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_AssignVoiceCapacityProfilesActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_AssignVoiceCapacityProfilesActionRequestParameters>;

  constructor(parameters: msdyn_AssignVoiceCapacityProfilesActionRequestParameters) {
    super("msdyn_AssignVoiceCapacityProfilesAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AssignVoiceCapacityProfilesAction`;

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
  ): Promise<msdyn_AssignVoiceCapacityProfilesActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_AssignVoiceCapacityProfilesActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_AssignVoiceCapacityProfilesAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AssignVoiceCapacityProfilesActionResult {
  "@odata.context"?: string;
  ActionResult: string;
}

/**
 * msdyn_AssignVoiceCapacityProfilesAction response message
 *
 * `result` is the value the msdyn_AssignVoiceCapacityProfilesAction action returns (see {@link msdyn_AssignVoiceCapacityProfilesActionResult}).
 */
export class msdyn_AssignVoiceCapacityProfilesActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_AssignVoiceCapacityProfilesActionResult) {
    super("msdyn_AssignVoiceCapacityProfilesAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_AssignVoiceCapacityProfilesActionResponse {
    return new msdyn_AssignVoiceCapacityProfilesActionResponse(
      data as msdyn_AssignVoiceCapacityProfilesActionResult
    );
  }
}
