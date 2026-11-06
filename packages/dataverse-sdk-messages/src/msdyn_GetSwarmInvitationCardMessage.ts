import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_GetSwarmInvitationCard message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSwarmInvitationCardRequestParameters {
  msdyn_SwarmParticipant: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetSwarmInvitationCard request message
 *
 * Web API Action: msdyn_GetSwarmInvitationCard
 */
export class msdyn_GetSwarmInvitationCardRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSwarmInvitationCardResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSwarmInvitationCardRequestParameters>;

  constructor(parameters: msdyn_GetSwarmInvitationCardRequestParameters) {
    super("msdyn_GetSwarmInvitationCard", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSwarmInvitationCard`;

    const body = requestBody({
      msdyn_SwarmParticipant: this.Parameters.msdyn_SwarmParticipant,
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

  async parseResponse(response: Response): Promise<msdyn_GetSwarmInvitationCardResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSwarmInvitationCardResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSwarmInvitationCard action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSwarmInvitationCardResult {
  "@odata.context"?: string;
  msdyn_SwarmCardRecipient: string;
  msdyn_SwarmInvitationCardJson: string;
  msdyn_SwarmInvitationResponse: string;
}

/**
 * msdyn_GetSwarmInvitationCard response message
 *
 * `result` is the value the msdyn_GetSwarmInvitationCard action returns (see {@link msdyn_GetSwarmInvitationCardResult}).
 */
export class msdyn_GetSwarmInvitationCardResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSwarmInvitationCardResult) {
    super("msdyn_GetSwarmInvitationCard");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSwarmInvitationCardResponse {
    return new msdyn_GetSwarmInvitationCardResponse(data as msdyn_GetSwarmInvitationCardResult);
  }
}
