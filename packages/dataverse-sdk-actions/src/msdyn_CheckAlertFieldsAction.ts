import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckAlertFields action
 */
export interface msdyn_CheckAlertFieldsResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
}

/**
 * msdyn_CheckAlertFields action
 *
 * Unbound action
 */
export class msdyn_CheckAlertFieldsAction implements Executable<msdyn_CheckAlertFieldsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckAlertFields`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckAlertFieldsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckAlertFieldsResponse;
    return (await response.json()) as msdyn_CheckAlertFieldsResponse;
  }
}
