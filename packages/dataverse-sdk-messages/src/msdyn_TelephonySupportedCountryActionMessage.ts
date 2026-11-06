import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonySupportedCountryActionResponse as msdyn_TelephonySupportedCountryActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TelephonySupportedCountryAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonySupportedCountryActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonySupportedCountryAction request message
 *
 * Web API Action: msdyn_TelephonySupportedCountryAction
 */
export class msdyn_TelephonySupportedCountryActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonySupportedCountryActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonySupportedCountryActionRequestParameters>;

  constructor(parameters: msdyn_TelephonySupportedCountryActionRequestParameters) {
    super("msdyn_TelephonySupportedCountryAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonySupportedCountryAction`;

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

  async parseResponse(response: Response): Promise<msdyn_TelephonySupportedCountryActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TelephonySupportedCountryActionResponse.fromResponse({});
    return msdyn_TelephonySupportedCountryActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_TelephonySupportedCountryAction response message
 */
export class msdyn_TelephonySupportedCountryActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonySupportedCountryActionResponseData) {
    super("msdyn_TelephonySupportedCountryAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonySupportedCountryActionResponse {
    return new msdyn_TelephonySupportedCountryActionResponse(
      responseObject<msdyn_TelephonySupportedCountryActionResponseData>(data)
    );
  }
}
