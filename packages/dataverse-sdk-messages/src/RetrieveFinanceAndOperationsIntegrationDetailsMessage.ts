import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveFinanceAndOperationsIntegrationDetails request message
 *
 * Web API Function: RetrieveFinanceAndOperationsIntegrationDetails
 */
export class RetrieveFinanceAndOperationsIntegrationDetailsRequest
  extends OrganizationRequest
  implements Executable<RetrieveFinanceAndOperationsIntegrationDetailsResponse>
{
  constructor() {
    super("RetrieveFinanceAndOperationsIntegrationDetails");
  }

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
    return RetrieveFinanceAndOperationsIntegrationDetailsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the RetrieveFinanceAndOperationsIntegrationDetails function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveFinanceAndOperationsIntegrationDetailsResult {
  "@odata.context"?: string;
  Id: string;
  IsUnifiedDatabase: boolean;
  OrgLifecycleStatus: string;
  TenantId: string;
  Url: string;
}

/**
 * RetrieveFinanceAndOperationsIntegrationDetails response message
 *
 * `result` is the value the RetrieveFinanceAndOperationsIntegrationDetails function returns (see {@link RetrieveFinanceAndOperationsIntegrationDetailsResult}).
 */
export class RetrieveFinanceAndOperationsIntegrationDetailsResponse extends OrganizationResponse {
  constructor(public result: RetrieveFinanceAndOperationsIntegrationDetailsResult) {
    super("RetrieveFinanceAndOperationsIntegrationDetails");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveFinanceAndOperationsIntegrationDetailsResponse {
    return new RetrieveFinanceAndOperationsIntegrationDetailsResponse(
      data as RetrieveFinanceAndOperationsIntegrationDetailsResult
    );
  }
}
