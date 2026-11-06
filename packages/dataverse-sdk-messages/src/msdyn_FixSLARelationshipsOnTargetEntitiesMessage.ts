import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_FixSLARelationshipsOnTargetEntities message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FixSLARelationshipsOnTargetEntitiesRequestParameters {
  SLAEnabledEnitiesToProcess: string;
}

/**
 * msdyn_FixSLARelationshipsOnTargetEntities request message
 *
 * Web API Action: msdyn_FixSLARelationshipsOnTargetEntities
 */
export class msdyn_FixSLARelationshipsOnTargetEntitiesRequest
  extends OrganizationRequest
  implements Executable<msdyn_FixSLARelationshipsOnTargetEntitiesResponse>
{
  declare readonly Parameters: Readonly<msdyn_FixSLARelationshipsOnTargetEntitiesRequestParameters>;

  constructor(parameters: msdyn_FixSLARelationshipsOnTargetEntitiesRequestParameters) {
    super("msdyn_FixSLARelationshipsOnTargetEntities", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FixSLARelationshipsOnTargetEntities`;

    const body = requestBody({
      SLAEnabledEnitiesToProcess: this.Parameters.SLAEnabledEnitiesToProcess,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_FixSLARelationshipsOnTargetEntitiesResponse> {
    // No return value (204 No Content)
    return new msdyn_FixSLARelationshipsOnTargetEntitiesResponse();
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
