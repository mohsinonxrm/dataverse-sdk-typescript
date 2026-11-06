import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonySupportedVoiceProfilesActionResponse as msdyn_TelephonySupportedVoiceProfilesActionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TelephonySupportedVoiceProfilesActionResponse.fromResponse({});
    return msdyn_TelephonySupportedVoiceProfilesActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_TelephonySupportedVoiceProfilesAction response message
 */
export class msdyn_TelephonySupportedVoiceProfilesActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonySupportedVoiceProfilesActionResponseData) {
    super("msdyn_TelephonySupportedVoiceProfilesAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonySupportedVoiceProfilesActionResponse {
    return new msdyn_TelephonySupportedVoiceProfilesActionResponse(
      responseObject<msdyn_TelephonySupportedVoiceProfilesActionResponseData>(data)
    );
  }
}
