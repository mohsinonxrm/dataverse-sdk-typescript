import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DoesKBExist action
 */
export interface msdyn_DoesKBExistResponse {
  Response: string;
}

/**
 * msdyn_DoesKBExist action
 *
 * Unbound action
 */
export class msdyn_DoesKBExistAction implements Executable<msdyn_DoesKBExistResponse> {
  constructor(public readonly cSCopilotRequest: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DoesKBExist`;

    const body: Record<string, unknown> = {
      CSCopilotRequest: this.cSCopilotRequest,
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

  async parseResponse(response: Response): Promise<msdyn_DoesKBExistResponse> {
    const data = await response.json();
    return data as msdyn_DoesKBExistResponse;
  }
}
