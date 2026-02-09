import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { SubstitutionResult } from "./types/index.js";

/**
 * Response from SubstituteForComponent action
 */
export interface SubstituteForComponentResponse {
  Result: SubstitutionResult;
}

/**
 * SubstituteForComponent action
 *
 * Unbound action
 */
export class SubstituteForComponentAction implements Executable<SubstituteForComponentResponse> {
  constructor(
    public readonly entity: EntityReference,
    public readonly subStore: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SubstituteForComponent`;

    const body: Record<string, unknown> = {
      Entity: this.entity,
      SubStore: this.subStore,
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

  async parseResponse(response: Response): Promise<SubstituteForComponentResponse> {
    const data = await response.json();
    return data as SubstituteForComponentResponse;
  }
}
