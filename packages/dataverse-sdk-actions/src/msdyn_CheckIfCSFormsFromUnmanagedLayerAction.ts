import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfCSFormsFromUnmanagedLayer action
 */
export interface msdyn_CheckIfCSFormsFromUnmanagedLayerResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
  ReturnSeverity: number;
  HelpLink: string;
}

/**
 * msdyn_CheckIfCSFormsFromUnmanagedLayer action
 *
 * Unbound action
 */
export class msdyn_CheckIfCSFormsFromUnmanagedLayerAction implements Executable<msdyn_CheckIfCSFormsFromUnmanagedLayerResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfCSFormsFromUnmanagedLayer`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfCSFormsFromUnmanagedLayerResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckIfCSFormsFromUnmanagedLayerResponse;
  }
}
