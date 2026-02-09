import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FSDemoDataRequest action
 */
export interface msdyn_FSDemoDataRequestResponse {
  Response: string;
}

/**
 * msdyn_FSDemoDataRequest action
 *
 * Unbound action
 */
export class msdyn_FSDemoDataRequestAction implements Executable<msdyn_FSDemoDataRequestResponse> {
  constructor(public readonly operation: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FSDemoDataRequest`;

    const body: Record<string, unknown> = {
      Operation: this.operation,
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

  async parseResponse(response: Response): Promise<msdyn_FSDemoDataRequestResponse> {
    const data = await response.json();
    return data as msdyn_FSDemoDataRequestResponse;
  }
}
