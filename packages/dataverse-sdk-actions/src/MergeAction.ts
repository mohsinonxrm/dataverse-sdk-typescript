import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the Merge action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type MergeResponse = void;

/**
 * Parameters of the Merge action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface MergeActionParameters {
  Target: EntityReference | AnyEntityPayload;
  Subordinate: EntityReference | AnyEntityPayload;
  UpdateContent?: EntityReference | AnyEntityPayload;
  PerformParentingChecks: boolean;
}

/**
 * Merge action
 *
 * Unbound action
 */
export class MergeAction implements Executable<MergeResponse> {
  constructor(public readonly parameters: MergeActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Merge`;

    const body = requestBody({
      Target: this.parameters.Target,
      Subordinate: this.parameters.Subordinate,
      UpdateContent: this.parameters.UpdateContent,
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

  parseResponse(_response: Response): Promise<MergeResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
