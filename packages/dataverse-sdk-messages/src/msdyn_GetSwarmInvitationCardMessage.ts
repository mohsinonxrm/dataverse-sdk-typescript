import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_GetSwarmInvitationCardResponse as msdyn_GetSwarmInvitationCardResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetSwarmInvitationCardResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetSwarmInvitationCard response message
 */
export class msdyn_GetSwarmInvitationCardResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSwarmInvitationCardResponseData) {
    super("msdyn_GetSwarmInvitationCard");
  }

  static fromResponse(data: unknown): msdyn_GetSwarmInvitationCardResponse {
    return new msdyn_GetSwarmInvitationCardResponse(
      responseObject<msdyn_GetSwarmInvitationCardResponseData>(data)
    );
  }
}
