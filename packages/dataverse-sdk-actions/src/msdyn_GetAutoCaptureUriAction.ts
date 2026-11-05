import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetAutoCaptureUri action
 */
export interface msdyn_GetAutoCaptureUriResponse {
  uri: string;
}

/**
 * msdyn_GetAutoCaptureUri action
 *
 * Unbound action
 */
export class msdyn_GetAutoCaptureUriAction implements Executable<msdyn_GetAutoCaptureUriResponse> {
  constructor(public readonly uriType: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAutoCaptureUri`;

    const body: Record<string, unknown> = {
      uriType: this.uriType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAutoCaptureUriResponse> {
    const data = await response.json();
    return data as msdyn_GetAutoCaptureUriResponse;
  }
}
