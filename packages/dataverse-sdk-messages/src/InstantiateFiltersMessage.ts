import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { savedquery } from "./types/index.js";

/**
 * Parameters of the InstantiateFilters message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InstantiateFiltersRequestParameters {
  TemplateCollection: (EntityReference | EntityPayload<savedquery>)[];
}

/**
 * InstantiateFilters request message
 *
 * Web API Action: InstantiateFilters
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class InstantiateFiltersRequest
  extends OrganizationRequest
  implements Executable<InstantiateFiltersResponse>
{
  declare readonly Parameters: Readonly<InstantiateFiltersRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: InstantiateFiltersRequestParameters
  ) {
    super("InstantiateFilters", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.InstantiateFilters`;

    const body = requestBody({
      TemplateCollection: this.Parameters.TemplateCollection,
    });

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
