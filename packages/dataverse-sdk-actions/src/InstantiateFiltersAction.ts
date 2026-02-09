import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { savedquery } from "./types/index.js";

/**
 * Response from InstantiateFilters action
 */
export interface InstantiateFiltersResponse {
  // No content returned
}

/**
 * InstantiateFilters action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 */
export class InstantiateFiltersAction implements Executable<InstantiateFiltersResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly templateCollection: savedquery[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.InstantiateFilters`;

    const body: Record<string, unknown> = {
      TemplateCollection: this.templateCollection,
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

  async parseResponse(response: Response): Promise<InstantiateFiltersResponse> {
    // No return value (204 No Content)
    return {};
  }
}
