import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckIfSalesFormsFromUnmanagedLayer action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckIfSalesFormsFromUnmanagedLayerResponse;
  }
}
