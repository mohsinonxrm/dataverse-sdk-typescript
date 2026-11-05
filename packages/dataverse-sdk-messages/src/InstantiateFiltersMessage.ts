import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { savedquery } from "./types/index.js";

/**
 * InstantiateFilters request message
 *
 * Web API Action: InstantiateFilters
 */
export class InstantiateFiltersRequest
  extends OrganizationRequest
  implements Executable<InstantiateFiltersResponse>
{
  constructor(
    public systemuserId: string,
    public templateCollection: savedquery[]
  ) {
    super("InstantiateFilters");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<InstantiateFiltersResponse> {
    // No return value (204 No Content)
    return new InstantiateFiltersResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.systemuserId,
      TemplateCollection: this.templateCollection,
    };
  }
}

/**
 * InstantiateFilters response message
 */
export class InstantiateFiltersResponse extends OrganizationResponse {
  constructor() {
    super("InstantiateFilters");
  }

  static fromResponse(_data: unknown): InstantiateFiltersResponse {
    return new InstantiateFiltersResponse();
  }
}
