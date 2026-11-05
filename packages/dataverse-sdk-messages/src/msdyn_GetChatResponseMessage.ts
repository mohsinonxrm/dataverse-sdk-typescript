import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetChatResponse request message
 *
 * Web API Action: msdyn_GetChatResponse
 */
export class msdyn_GetChatResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetChatResponseResponse>
{
  constructor(public msdyn_input: string) {
    super("msdyn_GetChatResponse");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetChatResponse`;

    const body: Record<string, unknown> = {
      msdyn_input: this.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_GetChatResponseResponse> {
    const data = await response.json();
    return msdyn_GetChatResponseResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_input: this.msdyn_input,
    };
  }
}

/**
 * msdyn_GetChatResponse response message
 */
export class msdyn_GetChatResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetChatResponseResponse) {
    super("msdyn_GetChatResponse");
  }

  static fromResponse(data: unknown): msdyn_GetChatResponseResponse {
    return new msdyn_GetChatResponseResponse((data as any).value);
  }
}
