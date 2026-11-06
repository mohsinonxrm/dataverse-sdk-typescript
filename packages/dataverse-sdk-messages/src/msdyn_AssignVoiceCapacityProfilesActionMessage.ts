import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_AssignVoiceCapacityProfilesActionResponse as msdyn_AssignVoiceCapacityProfilesActionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_AssignVoiceCapacityProfilesActionResponse.fromResponse({});
    return msdyn_AssignVoiceCapacityProfilesActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_AssignVoiceCapacityProfilesAction response message
 */
export class msdyn_AssignVoiceCapacityProfilesActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_AssignVoiceCapacityProfilesActionResponseData) {
    super("msdyn_AssignVoiceCapacityProfilesAction");
  }

  static fromResponse(data: unknown): msdyn_AssignVoiceCapacityProfilesActionResponse {
    return new msdyn_AssignVoiceCapacityProfilesActionResponse(
      responseObject<msdyn_AssignVoiceCapacityProfilesActionResponseData>(data)
    );
  }
}
