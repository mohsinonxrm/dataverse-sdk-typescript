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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse;
  }
}
