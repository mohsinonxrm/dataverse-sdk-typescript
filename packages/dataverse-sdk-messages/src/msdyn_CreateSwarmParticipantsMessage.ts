import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_CreateSwarmParticipants request message
 *
 * Web API Action: msdyn_CreateSwarmParticipants
 */
export class msdyn_CreateSwarmParticipantsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateSwarmParticipantsResponse>
{
  constructor(public swarmEntityReference: EntityReference) {
    super("msdyn_CreateSwarmParticipants");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSwarmParticipants`;

    const body: Record<string, unknown> = {
      SwarmEntityReference: this.swarmEntityReference,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSwarmParticipantsResponse> {
    // No return value (204 No Content)
    return new msdyn_CreateSwarmParticipantsResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SwarmEntityReference: this.swarmEntityReference,
    };
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
