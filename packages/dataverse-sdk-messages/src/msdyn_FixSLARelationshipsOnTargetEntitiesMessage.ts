import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FixSLARelationshipsOnTargetEntities request message
 *
 * Web API Action: msdyn_FixSLARelationshipsOnTargetEntities
 */
export class msdyn_FixSLARelationshipsOnTargetEntitiesRequest
  extends OrganizationRequest
  implements Executable<msdyn_FixSLARelationshipsOnTargetEntitiesResponse>
{
  constructor(public sLAEnabledEnitiesToProcess: string) {
    super("msdyn_FixSLARelationshipsOnTargetEntities");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FixSLARelationshipsOnTargetEntities`;

    const body: Record<string, unknown> = {
      SLAEnabledEnitiesToProcess: this.sLAEnabledEnitiesToProcess,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_FixSLARelationshipsOnTargetEntitiesResponse> {
    // No return value (204 No Content)
    return new msdyn_FixSLARelationshipsOnTargetEntitiesResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SLAEnabledEnitiesToProcess: this.sLAEnabledEnitiesToProcess,
    };
  }
}

/**
 * msdyn_FixSLARelationshipsOnTargetEntities response message
 */
export class msdyn_FixSLARelationshipsOnTargetEntitiesResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_FixSLARelationshipsOnTargetEntities");
  }

  static fromResponse(_data: unknown): msdyn_FixSLARelationshipsOnTargetEntitiesResponse {
    return new msdyn_FixSLARelationshipsOnTargetEntitiesResponse();
  }
}
