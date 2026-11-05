import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForWorkOrderTypes action
 */
export interface msdyn_CheckForWorkOrderTypesResponse {
  ReturnStatus: number;
  ReturnSeverity: number;
  ResultEntities: string;
  Message: string;
}

/**
 * msdyn_CheckForWorkOrderTypes action
 *
 * Unbound action
 */
export class msdyn_CheckForWorkOrderTypesAction implements Executable<msdyn_CheckForWorkOrderTypesResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForWorkOrderTypes`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForWorkOrderTypesResponse> {
    const data = await response.json();
    return data as msdyn_CheckForWorkOrderTypesResponse;
  }
}
