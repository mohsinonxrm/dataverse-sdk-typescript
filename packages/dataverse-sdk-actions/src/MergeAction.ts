import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from Merge action
 */
export interface MergeResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<MergeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as MergeResponse;
    return (await response.json()) as MergeResponse;
  }
}
