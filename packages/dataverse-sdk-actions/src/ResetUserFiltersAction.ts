import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ResetUserFilters action
 */
export interface ResetUserFiltersResponse {
  // No content returned
}

/**
 * ResetUserFilters action
 *
 * Unbound action
 */
export class ResetUserFiltersAction implements Executable<ResetUserFiltersResponse> {
  constructor(public readonly queryType: number) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ResetUserFilters`;

    const body: Record<string, unknown> = {
      QueryType: this.queryType,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ResetUserFiltersResponse> {
    // No return value (204 No Content)
    return {};
  }
}
