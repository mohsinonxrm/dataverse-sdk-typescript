import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { savedquery } from "./types/index.js";

/**
 * Response from the InstantiateFilters action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type InstantiateFiltersResponse = void;

/**
 * Parameters of the InstantiateFilters action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InstantiateFiltersActionParameters {
  TemplateCollection: (EntityReference | EntityPayload<savedquery>)[];
}

/**
 * InstantiateFilters action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class InstantiateFiltersAction implements Executable<InstantiateFiltersResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: InstantiateFiltersActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.InstantiateFilters`;

    const body = requestBody({
      TemplateCollection: this.parameters.TemplateCollection,
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

  parseResponse(_response: Response): Promise<InstantiateFiltersResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
