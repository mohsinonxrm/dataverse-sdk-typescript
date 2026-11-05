import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * AppendRelatedParty request message
 *
 * Web API Action: AppendRelatedParty
 */
export class AppendRelatedPartyRequest
  extends OrganizationRequest
  implements Executable<AppendRelatedPartyResponse>
{
  constructor(
    public activity: EntityReference,
    public party: EntityReference
  ) {
    super("AppendRelatedParty");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AppendRelatedParty`;

    const body: Record<string, unknown> = {
      Activity: this.activity,
      Party: this.party,
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

  async parseResponse(response: Response): Promise<AppendRelatedPartyResponse> {
    // No return value (204 No Content)
    return new AppendRelatedPartyResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Activity: this.activity,
      Party: this.party,
    };
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
