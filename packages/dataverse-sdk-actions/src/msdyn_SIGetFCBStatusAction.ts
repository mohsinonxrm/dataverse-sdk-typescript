import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SIGetFCBStatus action
 */
export interface msdyn_SIGetFCBStatusResponse {
  Status: boolean;
}

/**
 * msdyn_SIGetFCBStatus action
 *
 * Unbound action
 */
export class msdyn_SIGetFCBStatusAction implements Executable<msdyn_SIGetFCBStatusResponse> {
  constructor(public readonly fCBName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SIGetFCBStatus`;

    const body: Record<string, unknown> = {
      FCBName: this.fCBName,
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

  async parseResponse(response: Response): Promise<msdyn_SIGetFCBStatusResponse> {
    const data = await response.json();
    return data as msdyn_SIGetFCBStatusResponse;
  }
}
