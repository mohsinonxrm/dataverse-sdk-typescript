import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UnpublishDuplicateRule action
 */
export interface UnpublishDuplicateRuleResponse {
  // No content returned
}

/**
 * UnpublishDuplicateRule action
 *
 * Unbound action
 */
export class UnpublishDuplicateRuleAction implements Executable<UnpublishDuplicateRuleResponse> {
  constructor(public readonly duplicateRuleId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UnpublishDuplicateRule`;

    const body: Record<string, unknown> = {
      DuplicateRuleId: this.duplicateRuleId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<UnpublishDuplicateRuleResponse> {
    // No return value (204 No Content)
    return {};
  }
}
