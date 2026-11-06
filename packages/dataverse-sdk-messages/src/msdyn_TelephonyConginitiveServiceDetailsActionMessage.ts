import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_TelephonyConginitiveServiceDetailsActionResponse as msdyn_TelephonyConginitiveServiceDetailsActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_TelephonyConginitiveServiceDetailsAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_TelephonyConginitiveServiceDetailsActionRequestParameters {
  ActionRequest: string;
}

/**
 * msdyn_TelephonyConginitiveServiceDetailsAction request message
 *
 * Web API Action: msdyn_TelephonyConginitiveServiceDetailsAction
 */
export class msdyn_TelephonyConginitiveServiceDetailsActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyConginitiveServiceDetailsActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_TelephonyConginitiveServiceDetailsActionRequestParameters>;

  constructor(parameters: msdyn_TelephonyConginitiveServiceDetailsActionRequestParameters) {
    super("msdyn_TelephonyConginitiveServiceDetailsAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TelephonyConginitiveServiceDetailsAction`;

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
  ): Promise<msdyn_TelephonyConginitiveServiceDetailsActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TelephonyConginitiveServiceDetailsActionResponse.fromResponse({});
    return msdyn_TelephonyConginitiveServiceDetailsActionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_TelephonyConginitiveServiceDetailsAction response message
 */
export class msdyn_TelephonyConginitiveServiceDetailsActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyConginitiveServiceDetailsActionResponseData) {
    super("msdyn_TelephonyConginitiveServiceDetailsAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyConginitiveServiceDetailsActionResponse {
    return new msdyn_TelephonyConginitiveServiceDetailsActionResponse(
      responseObject<msdyn_TelephonyConginitiveServiceDetailsActionResponseData>(data)
    );
  }
}
