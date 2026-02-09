import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_GetSwarmResponseCard request message
 *
 * Web API Action: msdyn_GetSwarmResponseCard
 */
export class msdyn_GetSwarmResponseCardRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSwarmResponseCardResponse>
{
  constructor(public msdyn_SwarmParticipant: EntityReference) {
    super("msdyn_GetSwarmResponseCard");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSwarmResponseCard`;

    const body: Record<string, unknown> = {
      msdyn_SwarmParticipant: this.msdyn_SwarmParticipant,
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

  async parseResponse(response: Response): Promise<msdyn_GetSwarmResponseCardResponse> {
    const data = await response.json();
    return msdyn_GetSwarmResponseCardResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_SwarmParticipant: this.msdyn_SwarmParticipant,
    };
  }
}

/**
 * msdyn_GetSwarmResponseCard response message
 */
export class msdyn_GetSwarmResponseCardResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSwarmResponseCardResponse) {
    super("msdyn_GetSwarmResponseCard");
  }

  static fromResponse(data: unknown): msdyn_GetSwarmResponseCardResponse {
    return new msdyn_GetSwarmResponseCardResponse((data as any).value);
  }
}
