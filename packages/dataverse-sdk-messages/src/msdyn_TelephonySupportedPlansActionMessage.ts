import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonySupportedPlansActionResponse as msdyn_TelephonySupportedPlansActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TelephonySupportedPlansAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonySupportedPlansActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonySupportedPlansAction request message
 *
 * Web API Action: msdyn_TelephonySupportedPlansAction
 */
export class msdyn_TelephonySupportedPlansActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonySupportedPlansActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonySupportedPlansActionRequestParameters>;

  constructor(parameters: msdyn_TelephonySupportedPlansActionRequestParameters) {
    super("msdyn_TelephonySupportedPlansAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonySupportedPlansAction`;

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

  async parseResponse(response: Response): Promise<msdyn_TelephonySupportedPlansActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_TelephonySupportedPlansActionResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_TelephonySupportedPlansAction response message
 */
export class msdyn_TelephonySupportedPlansActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonySupportedPlansActionResponseData) {
    super("msdyn_TelephonySupportedPlansAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonySupportedPlansActionResponse {
    return new msdyn_TelephonySupportedPlansActionResponse(
      responseObject<msdyn_TelephonySupportedPlansActionResponseData>(data)
    );
  }
}
