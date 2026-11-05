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
    const data = await response.json();
    return data as msdyn_CheckAlertFieldsResponse;
  }
}
