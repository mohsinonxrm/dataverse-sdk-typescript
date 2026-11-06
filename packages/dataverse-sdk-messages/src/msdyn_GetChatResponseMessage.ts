import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetChatResponseResponse as msdyn_GetChatResponseResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetChatResponse message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetChatResponseRequestParameters {
  msdyn_input: string;
}

/**
 * msdyn_GetChatResponse request message
 *
 * Web API Action: msdyn_GetChatResponse
 */
export class msdyn_GetChatResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetChatResponseResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetChatResponseRequestParameters>;

  constructor(parameters: msdyn_GetChatResponseRequestParameters) {
    super("msdyn_GetChatResponse", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetChatResponse`;

    const body = requestBody({
      msdyn_input: this.Parameters.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_GetChatResponseResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetChatResponseResponse.fromResponse({});
    return msdyn_GetChatResponseResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetChatResponse response message
 */
export class msdyn_GetChatResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetChatResponseResponseData) {
    super("msdyn_GetChatResponse");
  }

  static fromResponse(data: unknown): msdyn_GetChatResponseResponse {
    return new msdyn_GetChatResponseResponse(
      responseObject<msdyn_GetChatResponseResponseData>(data)
    );
  }
}
