import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetLineOfBusinessOptionValue action
 */
export interface msdyn_GetLineOfBusinessOptionValueResponse {
  Result: string;
}

/**
 * msdyn_GetLineOfBusinessOptionValue action
 *
 * Unbound action
 */
export class msdyn_GetLineOfBusinessOptionValueAction implements Executable<msdyn_GetLineOfBusinessOptionValueResponse> {
  constructor(public readonly requestPayload: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLineOfBusinessOptionValue`;

    const body: Record<string, unknown> = {
      RequestPayload: this.requestPayload,
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

  async parseResponse(response: Response): Promise<msdyn_GetLineOfBusinessOptionValueResponse> {
    const data = await response.json();
    return data as msdyn_GetLineOfBusinessOptionValueResponse;
  }
}
