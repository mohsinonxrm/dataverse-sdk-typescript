import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_MergeDuplicatesAction action
 */
export interface msdyn_MergeDuplicatesActionResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_MergeDuplicatesAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MergeDuplicatesActionActionParameters {
  Target?: EntityReference | AnyEntityPayload;
  Duplicates?: Record<string, unknown>[];
  PerformParentingChecks?: boolean;
}

/**
 * msdyn_MergeDuplicatesAction action
 *
 * Unbound action
 */
export class msdyn_MergeDuplicatesActionAction implements Executable<msdyn_MergeDuplicatesActionResponse> {
  constructor(public readonly parameters: msdyn_MergeDuplicatesActionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MergeDuplicatesAction`;

    const body = requestBody({
      Target: this.parameters.Target,
      Duplicates: this.parameters.Duplicates,
      PerformParentingChecks: this.parameters.PerformParentingChecks,
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

  async parseResponse(response: Response): Promise<msdyn_MergeDuplicatesActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_MergeDuplicatesActionResponse;
    return (await response.json()) as msdyn_MergeDuplicatesActionResponse;
  }
}
