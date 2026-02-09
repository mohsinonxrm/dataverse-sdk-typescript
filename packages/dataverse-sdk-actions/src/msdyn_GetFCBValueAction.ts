import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetFCBValue action
 */
export interface msdyn_GetFCBValueResponse {
  FCBValue: boolean;
}

/**
 * msdyn_GetFCBValue action
 *
 * Unbound action
 */
export class msdyn_GetFCBValueAction implements Executable<msdyn_GetFCBValueResponse> {
  constructor(public readonly fCBName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCBValue`;

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

  async parseResponse(response: Response): Promise<msdyn_GetFCBValueResponse> {
    const data = await response.json();
    return data as msdyn_GetFCBValueResponse;
  }
}
