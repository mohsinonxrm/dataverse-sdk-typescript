import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { UpsertResponse } from "./types/index.js";

/**
 * Response from the UpsertMultiple action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content, as it does for UpsertMultiple although the CSDL
 * declares a return type: "The `UpsertMultiple` action returns `204 NoContent`. The
 * `UpsertMultipleResponse` complex type isn't returned."
 *
 * @see https://learn.microsoft.com/power-apps/developer/data-platform/bulk-operations#examples
 */
export type UpsertMultipleResponse = {
  "@odata.context"?: string;
  Results: UpsertResponse[];
} | null;

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
    // Dataverse answers 204 No Content although the CSDL declares a return type
    if (response.status === 204) return null;
    // The body is the complex value, with its @odata.context
    return (await response.json()) as UpsertMultipleResponse;
  }
}
