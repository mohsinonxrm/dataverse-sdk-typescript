import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { opportunityclose } from "./types/index.js";

/**
 * Parameters of the LoseOpportunity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface LoseOpportunityRequestParameters {
  Caller?: string;
  OpportunityClose: EntityReference | EntityPayload<opportunityclose>;
  Status: number;
}

/**
 * LoseOpportunity request message
 *
 * Web API Action: LoseOpportunity
 */
export class LoseOpportunityRequest
  extends OrganizationRequest
  implements Executable<LoseOpportunityResponse>
{
  declare readonly Parameters: Readonly<LoseOpportunityRequestParameters>;

  constructor(parameters: LoseOpportunityRequestParameters) {
    super("LoseOpportunity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/LoseOpportunity`;

    const body = requestBody({
      Caller: this.Parameters.Caller,
      OpportunityClose: this.Parameters.OpportunityClose,
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
