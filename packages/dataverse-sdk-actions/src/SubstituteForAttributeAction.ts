import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { SubstitutionResult } from "./types/index.js";

/**
 * Response from the SubstituteForAttribute action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SubstituteForAttributeResponse {
  "@odata.context"?: string;
  Result: SubstitutionResult;
}

/**
 * Parameters of the SubstituteForAttribute action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SubstituteForAttributeActionParameters {
  AttributeName: string;
  AttributeContent: string;
  SubStore: string;
}

/**
 * SubstituteForAttribute action
 *
 * Unbound action
 */
export class SubstituteForAttributeAction implements Executable<SubstituteForAttributeResponse> {
  constructor(public readonly parameters: SubstituteForAttributeActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SubstituteForAttribute`;

    const body = requestBody({
      AttributeName: this.parameters.AttributeName,
      AttributeContent: this.parameters.AttributeContent,
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

  async parseResponse(response: Response): Promise<SubstituteForAttributeResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as SubstituteForAttributeResponse;
  }
}
