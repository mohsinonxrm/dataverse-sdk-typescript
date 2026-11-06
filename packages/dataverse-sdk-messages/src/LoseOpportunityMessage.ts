import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunityclose } from "./types/index.js";

/**
 * LoseOpportunity request message
 *
 * Web API Action: LoseOpportunity
 */
export class LoseOpportunityRequest
  extends OrganizationRequest
  implements Executable<LoseOpportunityResponse>
{
  constructor(
    public caller: string | undefined,
    public opportunityClose: EntityReference | EntityPayload<opportunityclose>,
    public status: number
  ) {
    super("LoseOpportunity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/LoseOpportunity`;

    const body: Record<string, unknown> = {
      Caller: this.caller,
      OpportunityClose: this.opportunityClose,
      Status: this.status,
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

  async parseResponse(response: Response): Promise<LoseOpportunityResponse> {
    // No return value (204 No Content)
    return new LoseOpportunityResponse();
  }
}

/**
 * LoseOpportunity response message
 */
export class LoseOpportunityResponse extends OrganizationResponse {
  constructor() {
    super("LoseOpportunity");
  }

  static fromResponse(_data: unknown): LoseOpportunityResponse {
    return new LoseOpportunityResponse();
  }
}
