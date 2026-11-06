import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_GetSwarmResponseCardResponse as msdyn_GetSwarmResponseCardResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetSwarmResponseCard message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSwarmResponseCardRequestParameters {
  msdyn_SwarmParticipant: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetSwarmResponseCard request message
 *
 * Web API Action: msdyn_GetSwarmResponseCard
 */
export class msdyn_GetSwarmResponseCardRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSwarmResponseCardResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSwarmResponseCardRequestParameters>;

  constructor(parameters: msdyn_GetSwarmResponseCardRequestParameters) {
    super("msdyn_GetSwarmResponseCard", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSwarmResponseCard`;

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

  async parseResponse(response: Response): Promise<msdyn_GetSwarmResponseCardResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetSwarmResponseCardResponse.fromResponse({});
    return msdyn_GetSwarmResponseCardResponse.fromResponse(await response.json());
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
