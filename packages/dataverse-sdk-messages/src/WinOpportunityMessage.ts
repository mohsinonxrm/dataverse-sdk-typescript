import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunityclose } from "./types/index.js";

/**
 * Parameters of the WinOpportunity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface WinOpportunityRequestParameters {
  OpportunityClose: EntityReference | EntityPayload<opportunityclose>;
  Caller?: string;
  Status: number;
}

/**
 * WinOpportunity request message
 *
 * Web API Action: WinOpportunity
 */
export class WinOpportunityRequest
  extends OrganizationRequest
  implements Executable<WinOpportunityResponse>
{
  declare readonly Parameters: Readonly<WinOpportunityRequestParameters>;

  constructor(parameters: WinOpportunityRequestParameters) {
    super("WinOpportunity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/WinOpportunity`;

    const body = requestBody({
      OpportunityClose: this.Parameters.OpportunityClose,
      Caller: this.Parameters.Caller,
      Status: this.Parameters.Status,
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
