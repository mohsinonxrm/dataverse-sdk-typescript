import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_CreateSwarmParticipants message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateSwarmParticipantsRequestParameters {
  SwarmEntityReference: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CreateSwarmParticipants request message
 *
 * Web API Action: msdyn_CreateSwarmParticipants
 */
export class msdyn_CreateSwarmParticipantsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateSwarmParticipantsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateSwarmParticipantsRequestParameters>;

  constructor(parameters: msdyn_CreateSwarmParticipantsRequestParameters) {
    super("msdyn_CreateSwarmParticipants", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSwarmParticipants`;

    const body = requestBody({
      SwarmEntityReference: this.Parameters.SwarmEntityReference,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSwarmParticipantsResponse> {
    // No return value (204 No Content)
    return new msdyn_CreateSwarmParticipantsResponse();
  }
}

/**
 * msdyn_CreateSwarmParticipants response message
 */
export class msdyn_CreateSwarmParticipantsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CreateSwarmParticipants");
  }

  static fromResponse(_data: unknown): msdyn_CreateSwarmParticipantsResponse {
    return new msdyn_CreateSwarmParticipantsResponse();
  }
}
