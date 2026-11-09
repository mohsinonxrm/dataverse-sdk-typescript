import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_CheckIfCSFormsFromUnmanagedLayer action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfCSFormsFromUnmanagedLayerResponse {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckIfCSFormsFromUnmanagedLayerResponse;
  }
}
