import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_ExecutePrimaryCreatePostActions request message
 *
 * Web API Action: msdyn_ExecutePrimaryCreatePostActions
 */
export class msdyn_ExecutePrimaryCreatePostActionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecutePrimaryCreatePostActionsResponse>
{
  constructor(
    public sourceEntityReference: EntityReference,
    public primaryEntityReference: EntityReference,
    public ruleId: string
  ) {
    super("msdyn_ExecutePrimaryCreatePostActions");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecutePrimaryCreatePostActions`;

    const body: Record<string, unknown> = {
      SourceEntityReference: this.sourceEntityReference,
      PrimaryEntityReference: this.primaryEntityReference,
      RuleId: this.ruleId,
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

  async parseResponse(response: Response): Promise<msdyn_ExecutePrimaryCreatePostActionsResponse> {
    // No return value (204 No Content)
    return new msdyn_ExecutePrimaryCreatePostActionsResponse();
  }
}

/**
 * msdyn_ExecutePrimaryCreatePostActions response message
 */
export class msdyn_ExecutePrimaryCreatePostActionsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ExecutePrimaryCreatePostActions");
  }

  static fromResponse(_data: unknown): msdyn_ExecutePrimaryCreatePostActionsResponse {
    return new msdyn_ExecutePrimaryCreatePostActionsResponse();
  }
}
