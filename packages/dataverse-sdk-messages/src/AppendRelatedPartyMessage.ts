import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the AppendRelatedParty message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AppendRelatedPartyRequestParameters {
  Activity: EntityReference | AnyEntityPayload;
  Party: EntityReference | AnyEntityPayload;
}

/**
 * AppendRelatedParty request message
 *
 * Web API Action: AppendRelatedParty
 */
export class AppendRelatedPartyRequest
  extends OrganizationRequest
  implements Executable<AppendRelatedPartyResponse>
{
  declare readonly Parameters: Readonly<AppendRelatedPartyRequestParameters>;

  constructor(parameters: AppendRelatedPartyRequestParameters) {
    super("AppendRelatedParty", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AppendRelatedParty`;

    const body = requestBody({
      Activity: this.Parameters.Activity,
      Party: this.Parameters.Party,
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

  async parseResponse(response: Response): Promise<AppendRelatedPartyResponse> {
    // No return value (204 No Content)
    return new AppendRelatedPartyResponse();
  }
}

/**
 * AppendRelatedParty response message
 */
export class AppendRelatedPartyResponse extends OrganizationResponse {
  constructor() {
    super("AppendRelatedParty");
  }

  static fromResponse(_data: unknown): AppendRelatedPartyResponse {
    return new AppendRelatedPartyResponse();
  }
}
