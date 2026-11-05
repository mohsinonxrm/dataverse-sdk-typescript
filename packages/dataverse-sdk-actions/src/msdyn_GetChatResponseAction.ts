import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetChatResponse action
 */
export interface msdyn_GetChatResponseResponse {
  msdyn_response: string;
}

/**
 * msdyn_GetChatResponse action
 *
 * Unbound action
 */
export class msdyn_GetChatResponseAction implements Executable<msdyn_GetChatResponseResponse> {
  constructor(public readonly msdyn_input: string) {}

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
    return data as msdyn_GetChatResponseResponse;
  }
}
