import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunityclose } from "./types/index.js";

/**
 * WinOpportunity request message
 *
 * Web API Action: WinOpportunity
 */
export class WinOpportunityRequest
  extends OrganizationRequest
  implements Executable<WinOpportunityResponse>
{
  constructor(
    public opportunityClose: EntityReference | EntityPayload<opportunityclose>,
    public caller: string | undefined,
    public status: number
  ) {
    super("WinOpportunity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/WinOpportunity`;

    const body: Record<string, unknown> = {
      OpportunityClose: this.opportunityClose,
      Caller: this.caller,
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

  async parseResponse(response: Response): Promise<WinOpportunityResponse> {
    // No return value (204 No Content)
    return new WinOpportunityResponse();
  }
}

/**
 * WinOpportunity response message
 */
export class WinOpportunityResponse extends OrganizationResponse {
  constructor() {
    super("WinOpportunity");
  }

  static fromResponse(_data: unknown): WinOpportunityResponse {
    return new WinOpportunityResponse();
  }
}
