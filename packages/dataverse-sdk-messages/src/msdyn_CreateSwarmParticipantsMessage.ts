import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * msdyn_CreateSwarmParticipants request message
 *
 * Web API Action: msdyn_CreateSwarmParticipants
 */
export class msdyn_CreateSwarmParticipantsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateSwarmParticipantsResponse>
{
  constructor(public swarmEntityReference: EntityReference | AnyEntityPayload) {
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
