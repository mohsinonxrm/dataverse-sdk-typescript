import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_ExecutePrimaryCreatePostActions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecutePrimaryCreatePostActionsRequestParameters {
  SourceEntityReference: EntityReference | AnyEntityPayload;
  PrimaryEntityReference: EntityReference | AnyEntityPayload;
  RuleId: string;
}

/**
 * msdyn_ExecutePrimaryCreatePostActions request message
 *
 * Web API Action: msdyn_ExecutePrimaryCreatePostActions
 */
export class msdyn_ExecutePrimaryCreatePostActionsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecutePrimaryCreatePostActionsResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecutePrimaryCreatePostActionsRequestParameters>;

  constructor(parameters: msdyn_ExecutePrimaryCreatePostActionsRequestParameters) {
    super("msdyn_ExecutePrimaryCreatePostActions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecutePrimaryCreatePostActions`;

    const body = requestBody({
      SourceEntityReference: this.Parameters.SourceEntityReference,
      PrimaryEntityReference: this.Parameters.PrimaryEntityReference,
      RuleId: this.Parameters.RuleId,
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

  parseResponse(_response: Response): Promise<msdyn_ExecutePrimaryCreatePostActionsResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_ExecutePrimaryCreatePostActionsResponse());
  }
}

/**
 * msdyn_ExecutePrimaryCreatePostActions response message
 */
export class msdyn_ExecutePrimaryCreatePostActionsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ExecutePrimaryCreatePostActions");
  }

  static fromResponse(_data?: unknown): msdyn_ExecutePrimaryCreatePostActionsResponse {
    return new msdyn_ExecutePrimaryCreatePostActionsResponse();
  }
}
