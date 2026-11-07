import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { UpsertResponse } from "./types/index.js";

/**
 * Response from the UpsertMultiple action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface UpsertMultipleResponse {
  "@odata.context"?: string;
  Results: UpsertResponse[];
}

/**
 * Parameters of the UpsertMultiple action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpsertMultipleActionParameters {
  Targets: Record<string, unknown>[];
}

/**
 * UpsertMultiple action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.crmbaseentity))
 *
 * The first argument is the entity set to call it on, for example "accounts".
 */
export class UpsertMultipleAction implements Executable<UpsertMultipleResponse> {
  constructor(
    public readonly entitySetName: string,
    public readonly parameters: UpsertMultipleActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/${this.entitySetName}/Microsoft.Dynamics.CRM.UpsertMultiple`;

    const body = requestBody({
      Targets: this.parameters.Targets,
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

  async parseResponse(response: Response): Promise<UpsertMultipleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as UpsertMultipleResponse;
  }
}
