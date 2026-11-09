import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetChatResponseResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetChatResponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetChatResponseResult {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * msdyn_GetChatResponse response message
 *
 * `result` is the value the msdyn_GetChatResponse action returns (see {@link msdyn_GetChatResponseResult}).
 */
export class msdyn_GetChatResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetChatResponseResult) {
    super("msdyn_GetChatResponse");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetChatResponseResponse {
    return new msdyn_GetChatResponseResponse(data as msdyn_GetChatResponseResult);
  }
}
