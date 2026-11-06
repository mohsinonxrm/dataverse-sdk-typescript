import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveFinanceAndOperationsIntegrationDetails function
 */
export interface RetrieveFinanceAndOperationsIntegrationDetailsResponse {
  Id: string;
  Url: string;
  TenantId: string;
  IsUnifiedDatabase: boolean;
  OrgLifecycleStatus: string;
}

/**
 * RetrieveFinanceAndOperationsIntegrationDetails function
 *
 * Unbound function
 */
export class RetrieveFinanceAndOperationsIntegrationDetailsFunction implements Executable<RetrieveFinanceAndOperationsIntegrationDetailsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveFinanceAndOperationsIntegrationDetails`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<RetrieveFinanceAndOperationsIntegrationDetailsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as RetrieveFinanceAndOperationsIntegrationDetailsResponse;
    return (await response.json()) as RetrieveFinanceAndOperationsIntegrationDetailsResponse;
  }
}
