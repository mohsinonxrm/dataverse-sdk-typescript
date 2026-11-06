import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfSalesFormsFromUnmanagedLayer action
 */
export interface msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
  ReturnSeverity: number;
  HelpLink: string;
}

/**
 * msdyn_CheckIfSalesFormsFromUnmanagedLayer action
 *
 * Unbound action
 */
export class msdyn_CheckIfSalesFormsFromUnmanagedLayerAction implements Executable<msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfSalesFormsFromUnmanagedLayer`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse;
  }
}
