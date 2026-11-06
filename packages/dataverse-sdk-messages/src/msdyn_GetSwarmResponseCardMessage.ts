import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_GetSwarmResponseCardResponse as msdyn_GetSwarmResponseCardResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSwarmResponseCardResponse> {
    const data = await response.json();
    return msdyn_GetSwarmResponseCardResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetSwarmResponseCard response message
 */
export class msdyn_GetSwarmResponseCardResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSwarmResponseCardResponseData) {
    super("msdyn_GetSwarmResponseCard");
  }

  static fromResponse(data: unknown): msdyn_GetSwarmResponseCardResponse {
    return new msdyn_GetSwarmResponseCardResponse(
      responseObject<msdyn_GetSwarmResponseCardResponseData>(data)
    );
  }
}
