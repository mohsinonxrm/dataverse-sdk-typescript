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
 */
export class UpsertMultipleAction implements Executable<UpsertMultipleResponse> {
  constructor(public readonly targets: Record<string, unknown>[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpsertMultiple`;

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
