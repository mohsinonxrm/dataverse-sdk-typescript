import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CalculateActualValueOpportunity request message
 *
 * Web API Action: CalculateActualValueOpportunity
 *
 * The first argument is the id of the opportunity record to call it on.
 */
export class CalculateActualValueOpportunityRequest
  extends OrganizationRequest
  implements Executable<CalculateActualValueOpportunityResponse>
{
  constructor(public opportunityId: string) {
    super("CalculateActualValueOpportunity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/opportunities(${odataLiteral.guid(this.opportunityId)})/Microsoft.Dynamics.CRM.CalculateActualValueOpportunity`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CalculateActualValueOpportunityResponse> {
    // The body is the complex value, with its @odata.context
    return CalculateActualValueOpportunityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CalculateActualValueOpportunity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CalculateActualValueOpportunityResult {
  "@odata.context"?: string;
  Value: number;
}

/**
 * CalculateActualValueOpportunity response message
 *
 * `result` is the value the CalculateActualValueOpportunity action returns (see {@link CalculateActualValueOpportunityResult}).
 */
export class CalculateActualValueOpportunityResponse extends OrganizationResponse {
  constructor(public result: CalculateActualValueOpportunityResult) {
    super("CalculateActualValueOpportunity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CalculateActualValueOpportunityResponse {
    return new CalculateActualValueOpportunityResponse(
      data as CalculateActualValueOpportunityResult
    );
  }
}
