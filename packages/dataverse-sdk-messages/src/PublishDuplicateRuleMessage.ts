import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { asyncoperation } from "./types/index.js";

/**
 * PublishDuplicateRule request message
 *
 * Web API Action: PublishDuplicateRule
 *
 * The first argument is the id of the duplicaterule record to call it on.
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return PublishDuplicateRuleResponse.fromResponse(text ? JSON.parse(text) : {});
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
    return new PublishDuplicateRuleResponse(responseObject<asyncoperation>(data));
  }
}
