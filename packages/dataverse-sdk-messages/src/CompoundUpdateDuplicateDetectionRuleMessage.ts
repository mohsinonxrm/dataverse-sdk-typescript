import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * CompoundUpdateDuplicateDetectionRule request message
 *
 * Web API Action: CompoundUpdateDuplicateDetectionRule
 */
export class CompoundUpdateDuplicateDetectionRuleRequest
  extends OrganizationRequest
  implements Executable<CompoundUpdateDuplicateDetectionRuleResponse>
{
  constructor(
    public entity: EntityReference,
    public childEntities: Record<string, unknown>[]
  ) {
    super("CompoundUpdateDuplicateDetectionRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CompoundUpdateDuplicateDetectionRule`;

    const body: Record<string, unknown> = {
      Entity: this.entity,
      ChildEntities: this.childEntities,
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

  async parseResponse(response: Response): Promise<CompoundUpdateDuplicateDetectionRuleResponse> {
    // No return value (204 No Content)
    return new CompoundUpdateDuplicateDetectionRuleResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Entity: this.entity,
      ChildEntities: this.childEntities,
    };
  }
}

/**
 * CompoundUpdateDuplicateDetectionRule response message
 */
export class CompoundUpdateDuplicateDetectionRuleResponse extends OrganizationResponse {
  constructor() {
    super("CompoundUpdateDuplicateDetectionRule");
  }

  static fromResponse(_data: unknown): CompoundUpdateDuplicateDetectionRuleResponse {
    return new CompoundUpdateDuplicateDetectionRuleResponse();
  }
}
