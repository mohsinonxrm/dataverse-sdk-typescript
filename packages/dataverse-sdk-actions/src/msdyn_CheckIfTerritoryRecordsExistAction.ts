import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfTerritoryRecordsExist action
 */
export interface msdyn_CheckIfTerritoryRecordsExistResponse {
  ReturnStatus: number;
  ResultEntities: string;
  ReturnSeverity: number;
  Message: string;
}

/**
 * msdyn_CheckIfTerritoryRecordsExist action
 *
 * Unbound action
 */
export class msdyn_CheckIfTerritoryRecordsExistAction implements Executable<msdyn_CheckIfTerritoryRecordsExistResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfTerritoryRecordsExist`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckIfTerritoryRecordsExistResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckIfTerritoryRecordsExistResponse;
    return (await response.json()) as msdyn_CheckIfTerritoryRecordsExistResponse;
  }
}
