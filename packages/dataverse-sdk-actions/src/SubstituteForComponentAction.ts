import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { SubstitutionResult } from "./types/index.js";

/**
 * Response from SubstituteForComponent action
 */
export interface SubstituteForComponentResponse {
  Result: SubstitutionResult;
}

/**
 * Parameters of the SubstituteForComponent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SubstituteForComponentActionParameters {
  Entity: EntityReference | AnyEntityPayload;
  SubStore: string;
}

/**
 * SubstituteForComponent action
 *
 * Unbound action
 */
export class SubstituteForComponentAction implements Executable<SubstituteForComponentResponse> {
  constructor(public readonly parameters: SubstituteForComponentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SubstituteForComponent`;

    const body = requestBody({
      Entity: this.parameters.Entity,
      SubStore: this.parameters.SubStore,
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

  async parseResponse(response: Response): Promise<SubstituteForComponentResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as SubstituteForComponentResponse;
  }
}
