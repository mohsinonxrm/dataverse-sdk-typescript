import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_GetSwarmInvitationCard request message
 *
 * Web API Action: msdyn_GetSwarmInvitationCard
 */
export class msdyn_GetSwarmInvitationCardRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSwarmInvitationCardResponse>
{
  constructor(public msdyn_SwarmParticipant: EntityReference) {
    super("msdyn_GetSwarmInvitationCard");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSwarmInvitationCard`;

    const body: Record<string, unknown> = {
      msdyn_SwarmParticipant: this.msdyn_SwarmParticipant,
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

  async parseResponse(response: Response): Promise<msdyn_GetSwarmInvitationCardResponse> {
    const data = await response.json();
    return msdyn_GetSwarmInvitationCardResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_SwarmParticipant: this.msdyn_SwarmParticipant,
    };
  }
}

/**
 * msdyn_GetSwarmInvitationCard response message
 */
export class msdyn_GetSwarmInvitationCardResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSwarmInvitationCardResponse) {
    super("msdyn_GetSwarmInvitationCard");
  }

  static fromResponse(data: unknown): msdyn_GetSwarmInvitationCardResponse {
    return new msdyn_GetSwarmInvitationCardResponse((data as any).value);
  }
}
