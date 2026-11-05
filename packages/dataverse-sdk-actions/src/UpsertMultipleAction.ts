import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { UpsertResponse } from "./types/index.js";

/**
 * Response from UpsertMultiple action
 */
export interface UpsertMultipleResponse {
  Results: UpsertResponse[];
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
    public readonly targets: Record<string, unknown>[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/${this.entitySetName}/Microsoft.Dynamics.CRM.UpsertMultiple`;

    const body: Record<string, unknown> = {
      Targets: this.targets,
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

  async parseResponse(response: Response): Promise<UpsertMultipleResponse> {
    const data = await response.json();
    return data as UpsertMultipleResponse;
  }
}
