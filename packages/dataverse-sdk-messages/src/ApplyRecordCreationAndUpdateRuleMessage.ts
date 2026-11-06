import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * ApplyRecordCreationAndUpdateRule request message
 *
 * Web API Action: ApplyRecordCreationAndUpdateRule
 */
export class ApplyRecordCreationAndUpdateRuleRequest
  extends OrganizationRequest
  implements Executable<ApplyRecordCreationAndUpdateRuleResponse>
{
  constructor(public target: EntityReference | AnyEntityPayload) {
    super("ApplyRecordCreationAndUpdateRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ApplyRecordCreationAndUpdateRule`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<ApplyRecordCreationAndUpdateRuleResponse> {
    // No return value (204 No Content)
    return new ApplyRecordCreationAndUpdateRuleResponse();
  }
}

/**
 * ApplyRecordCreationAndUpdateRule response message
 */
export class ApplyRecordCreationAndUpdateRuleResponse extends OrganizationResponse {
  constructor() {
    super("ApplyRecordCreationAndUpdateRule");
  }

  static fromResponse(_data: unknown): ApplyRecordCreationAndUpdateRuleResponse {
    return new ApplyRecordCreationAndUpdateRuleResponse();
  }
}
