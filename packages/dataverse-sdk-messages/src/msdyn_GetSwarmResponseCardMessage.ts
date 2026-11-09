import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GetSwarmResponseCardResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSwarmResponseCard action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSwarmResponseCardResult {
  "@odata.context"?: string;
  msdyn_SwarmResponseCardJson: string;
  msdyn_SwarmResponseCardRecipient: string;
}

/**
 * msdyn_GetSwarmResponseCard response message
 *
 * `result` is the value the msdyn_GetSwarmResponseCard action returns (see {@link msdyn_GetSwarmResponseCardResult}).
 */
export class msdyn_GetSwarmResponseCardResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSwarmResponseCardResult) {
    super("msdyn_GetSwarmResponseCard");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSwarmResponseCardResponse {
    return new msdyn_GetSwarmResponseCardResponse(data as msdyn_GetSwarmResponseCardResult);
  }
}
