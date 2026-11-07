import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RetrieveFinanceAndOperationsIntegrationDetails function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveFinanceAndOperationsIntegrationDetailsResponse {
  "@odata.context"?: string;
  Id: string;
  IsUnifiedDatabase: boolean;
  OrgLifecycleStatus: string;
  TenantId: string;
  Url: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveFinanceAndOperationsIntegrationDetailsResponse;
  }
}
