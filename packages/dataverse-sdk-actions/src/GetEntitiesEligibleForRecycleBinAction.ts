import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the GetEntitiesEligibleForRecycleBin action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetEntitiesEligibleForRecycleBinResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetEntitiesEligibleForRecycleBinResponse;
  }
}
