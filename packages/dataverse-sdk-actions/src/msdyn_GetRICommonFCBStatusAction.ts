import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetRICommonFCBStatus action
 */
export interface msdyn_GetRICommonFCBStatusResponse {
  Status: boolean;
}

/**
 * msdyn_GetRICommonFCBStatus action
 *
 * Unbound action
 */
export class msdyn_GetRICommonFCBStatusAction implements Executable<msdyn_GetRICommonFCBStatusResponse> {
  constructor(public readonly fCBName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetRICommonFCBStatus`;

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

  async parseResponse(response: Response): Promise<msdyn_GetRICommonFCBStatusResponse> {
    const data = await response.json();
    return data as msdyn_GetRICommonFCBStatusResponse;
  }
}
