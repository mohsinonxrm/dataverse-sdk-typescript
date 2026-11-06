import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the CompoundUpdateDuplicateDetectionRule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CompoundUpdateDuplicateDetectionRuleRequestParameters {
  Entity: EntityReference | AnyEntityPayload;
  ChildEntities: Record<string, unknown>[];
}

/**
 * CompoundUpdateDuplicateDetectionRule request message
 *
 * Web API Action: CompoundUpdateDuplicateDetectionRule
 */
export class CompoundUpdateDuplicateDetectionRuleRequest
  extends OrganizationRequest
  implements Executable<CompoundUpdateDuplicateDetectionRuleResponse>
{
  declare readonly Parameters: Readonly<CompoundUpdateDuplicateDetectionRuleRequestParameters>;

  constructor(parameters: CompoundUpdateDuplicateDetectionRuleRequestParameters) {
    super("CompoundUpdateDuplicateDetectionRule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CompoundUpdateDuplicateDetectionRule`;

    const body = requestBody({
      Entity: this.Parameters.Entity,
      ChildEntities: this.Parameters.ChildEntities,
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

  async parseResponse(response: Response): Promise<CompoundUpdateDuplicateDetectionRuleResponse> {
    // No return value (204 No Content)
    return new CompoundUpdateDuplicateDetectionRuleResponse();
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
