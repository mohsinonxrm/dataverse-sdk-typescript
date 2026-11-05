import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UnpublishDuplicateRule request message
 *
 * Web API Action: UnpublishDuplicateRule
 */
export class UnpublishDuplicateRuleRequest
  extends OrganizationRequest
  implements Executable<UnpublishDuplicateRuleResponse>
{
  constructor(public duplicateRuleId: string) {
    super("UnpublishDuplicateRule");
  }

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
    return new UnpublishDuplicateRuleResponse();
  }
}

/**
 * UnpublishDuplicateRule response message
 */
export class UnpublishDuplicateRuleResponse extends OrganizationResponse {
  constructor() {
    super("UnpublishDuplicateRule");
  }

  static fromResponse(_data: unknown): UnpublishDuplicateRuleResponse {
    return new UnpublishDuplicateRuleResponse();
  }
}
