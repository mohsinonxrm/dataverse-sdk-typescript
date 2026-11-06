import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SetupRelationshipForEnablingEntityRouting message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetupRelationshipForEnablingEntityRoutingRequestParameters {
  EntityLogicalName: string;
}

/**
 * msdyn_SetupRelationshipForEnablingEntityRouting request message
 *
 * Web API Action: msdyn_SetupRelationshipForEnablingEntityRouting
 */
export class msdyn_SetupRelationshipForEnablingEntityRoutingRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetupRelationshipForEnablingEntityRoutingResponse>
{
  declare readonly Parameters: Readonly<msdyn_SetupRelationshipForEnablingEntityRoutingRequestParameters>;

  constructor(parameters: msdyn_SetupRelationshipForEnablingEntityRoutingRequestParameters) {
    super("msdyn_SetupRelationshipForEnablingEntityRouting", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetupRelationshipForEnablingEntityRouting`;

    const body = requestBody({
      EntityLogicalName: this.Parameters.EntityLogicalName,
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
  ): Promise<msdyn_SetupRelationshipForEnablingEntityRoutingResponse> {
    // No return value (204 No Content)
    return new msdyn_SetupRelationshipForEnablingEntityRoutingResponse();
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
