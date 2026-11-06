import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetIntentNextActionResponse as msdyn_GetIntentNextActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetIntentNextAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetIntentNextActionRequestParameters {
  IntentNextActionRequest: string;
}

/**
 * msdyn_GetIntentNextAction request message
 *
 * Web API Action: msdyn_GetIntentNextAction
 */
export class msdyn_GetIntentNextActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetIntentNextActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetIntentNextActionRequestParameters>;

  constructor(parameters: msdyn_GetIntentNextActionRequestParameters) {
    super("msdyn_GetIntentNextAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetIntentNextAction`;

    const body = requestBody({
      IntentNextActionRequest: this.Parameters.IntentNextActionRequest,
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

  async parseResponse(response: Response): Promise<msdyn_GetIntentNextActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetIntentNextActionResponse.fromResponse({});
    return msdyn_GetIntentNextActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetIntentNextAction response message
 */
export class msdyn_GetIntentNextActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetIntentNextActionResponseData) {
    super("msdyn_GetIntentNextAction");
  }

  static fromResponse(data: unknown): msdyn_GetIntentNextActionResponse {
    return new msdyn_GetIntentNextActionResponse(
      responseObject<msdyn_GetIntentNextActionResponseData>(data)
    );
  }
}
