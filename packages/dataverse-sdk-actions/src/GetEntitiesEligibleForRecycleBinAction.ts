import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from GetEntitiesEligibleForRecycleBin action
 */
export interface GetEntitiesEligibleForRecycleBinResponse {
  Result: string;
}

/**
 * GetEntitiesEligibleForRecycleBin action
 *
 * Unbound action
 */
export class GetEntitiesEligibleForRecycleBinAction implements Executable<GetEntitiesEligibleForRecycleBinResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetEntitiesEligibleForRecycleBin`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetEntitiesEligibleForRecycleBinResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetEntitiesEligibleForRecycleBinResponse;
    return (await response.json()) as GetEntitiesEligibleForRecycleBinResponse;
  }
}
