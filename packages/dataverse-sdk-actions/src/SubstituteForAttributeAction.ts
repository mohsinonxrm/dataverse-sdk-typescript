import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { SubstitutionResult } from "./types/index.js";

/**
 * Response from SubstituteForAttribute action
 */
export interface SubstituteForAttributeResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as SubstituteForAttributeResponse;
  }
}
