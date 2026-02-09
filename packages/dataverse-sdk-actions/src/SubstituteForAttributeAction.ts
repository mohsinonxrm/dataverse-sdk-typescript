import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { SubstitutionResult } from "./types/index.js";

/**
 * Response from SubstituteForAttribute action
 */
export interface SubstituteForAttributeResponse {
  Result: SubstitutionResult;
}

/**
 * SubstituteForAttribute action
 *
 * Unbound action
 */
export class SubstituteForAttributeAction implements Executable<SubstituteForAttributeResponse> {
  constructor(
    public readonly attributeName: string,
    public readonly attributeContent: string,
    public readonly subStore: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SubstituteForAttribute`;

    const body: Record<string, unknown> = {
      AttributeName: this.attributeName,
      AttributeContent: this.attributeContent,
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

  async parseResponse(response: Response): Promise<SubstituteForAttributeResponse> {
    const data = await response.json();
    return data as SubstituteForAttributeResponse;
  }
}
