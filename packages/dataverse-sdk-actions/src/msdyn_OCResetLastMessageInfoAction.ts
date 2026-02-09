import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_OCResetLastMessageInfo action
 */
export interface msdyn_OCResetLastMessageInfoResponse {
  ResponseData: string;
}

/**
 * msdyn_OCResetLastMessageInfo action
 *
 * Unbound action
 */
export class msdyn_OCResetLastMessageInfoAction implements Executable<msdyn_OCResetLastMessageInfoResponse> {
  constructor(public readonly liveWorkItemId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OCResetLastMessageInfo`;

    const body: Record<string, unknown> = {
      LiveWorkItemId: this.liveWorkItemId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OCResetLastMessageInfoResponse> {
    const data = await response.json();
    return data as msdyn_OCResetLastMessageInfoResponse;
  }
}
