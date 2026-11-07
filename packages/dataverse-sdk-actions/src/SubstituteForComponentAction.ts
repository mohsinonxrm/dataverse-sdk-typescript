import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { SubstitutionResult } from "./types/index.js";

/**
 * Response from the SubstituteForComponent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SubstituteForComponentResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as SubstituteForComponentResponse;
  }
}
