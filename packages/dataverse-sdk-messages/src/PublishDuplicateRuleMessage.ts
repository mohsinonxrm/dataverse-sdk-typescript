import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { asyncoperation } from "./types/index.js";

/**
 * PublishDuplicateRule request message
 *
 * Web API Action: PublishDuplicateRule
 */
export class PublishDuplicateRuleRequest
  extends OrganizationRequest
  implements Executable<PublishDuplicateRuleResponse>
{
  constructor(public duplicateruleId: string) {
    super("PublishDuplicateRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/duplicaterules(${this.duplicateruleId})/Microsoft.Dynamics.CRM.PublishDuplicateRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PublishDuplicateRuleResponse> {
    const data = await response.json();
    return PublishDuplicateRuleResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.duplicateruleId,
    };
  }
}

/**
 * PublishDuplicateRule response message
 */
export class PublishDuplicateRuleResponse extends OrganizationResponse {
  constructor(public result: asyncoperation) {
    super("PublishDuplicateRule");
  }

  static fromResponse(data: unknown): PublishDuplicateRuleResponse {
    return new PublishDuplicateRuleResponse((data as any).value);
  }
}
