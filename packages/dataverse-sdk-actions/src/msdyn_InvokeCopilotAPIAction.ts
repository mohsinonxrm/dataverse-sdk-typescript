import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_InvokeCopilotAPI action
 */
export interface msdyn_InvokeCopilotAPIResponse {
  msdyn_response: string;
}

/**
 * msdyn_InvokeCopilotAPI action
 *
 * Unbound action
 */
export class msdyn_InvokeCopilotAPIAction implements Executable<msdyn_InvokeCopilotAPIResponse> {
  constructor(
    public readonly msdyn_APIName: string,
    public readonly msdyn_payload: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeCopilotAPI`;

    const body: Record<string, unknown> = {
      msdyn_APIName: this.msdyn_APIName,
      msdyn_payload: this.msdyn_payload,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeCopilotAPIResponse> {
    const data = await response.json();
    return data as msdyn_InvokeCopilotAPIResponse;
  }
}
