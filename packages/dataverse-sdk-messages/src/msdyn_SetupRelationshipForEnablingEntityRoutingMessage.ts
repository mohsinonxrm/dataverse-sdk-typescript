import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SetupRelationshipForEnablingEntityRouting request message
 *
 * Web API Action: msdyn_SetupRelationshipForEnablingEntityRouting
 */
export class msdyn_SetupRelationshipForEnablingEntityRoutingRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetupRelationshipForEnablingEntityRoutingResponse>
{
  constructor(public entityLogicalName: string) {
    super("msdyn_SetupRelationshipForEnablingEntityRouting");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetupRelationshipForEnablingEntityRouting`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SetupRelationshipForEnablingEntityRoutingResponse> {
    // No return value (204 No Content)
    return new msdyn_SetupRelationshipForEnablingEntityRoutingResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityLogicalName: this.entityLogicalName,
    };
  }
}

/**
 * msdyn_SetupRelationshipForEnablingEntityRouting response message
 */
export class msdyn_SetupRelationshipForEnablingEntityRoutingResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SetupRelationshipForEnablingEntityRouting");
  }

  static fromResponse(_data: unknown): msdyn_SetupRelationshipForEnablingEntityRoutingResponse {
    return new msdyn_SetupRelationshipForEnablingEntityRoutingResponse();
  }
}
