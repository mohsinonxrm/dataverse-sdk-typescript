import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_MergeDuplicatesAction action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_MergeDuplicatesActionResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_MergeDuplicatesActionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
