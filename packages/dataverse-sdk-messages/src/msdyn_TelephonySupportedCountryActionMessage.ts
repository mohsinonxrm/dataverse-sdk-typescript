import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TelephonySupportedCountryActionResponse as msdyn_TelephonySupportedCountryActionResponseData } from "./types/index.js";

/**
 * msdyn_TelephonySupportedCountryAction request message
 *
 * Web API Action: msdyn_TelephonySupportedCountryAction
 */
export class msdyn_TelephonySupportedCountryActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonySupportedCountryActionResponse>
{
  constructor(public actionRequest: string) {
    super("msdyn_TelephonySupportedCountryAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonySupportedCountryAction`;

    const body: Record<string, unknown> = {
      ActionRequest: this.actionRequest,
    };

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
    const data = await response.json();
    return msdyn_TelephonySupportedCountryActionResponse.fromResponse(data);
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
