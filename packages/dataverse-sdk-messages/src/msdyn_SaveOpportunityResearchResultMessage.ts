import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SaveOpportunityResearchResult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveOpportunityResearchResultRequestParameters {
  OpportunityResearchResultPayload: string;
}

/**
 * msdyn_SaveOpportunityResearchResult request message
 *
 * Web API Action: msdyn_SaveOpportunityResearchResult
 */
export class msdyn_SaveOpportunityResearchResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_SaveOpportunityResearchResultResponse>
{
  declare readonly Parameters: Readonly<msdyn_SaveOpportunityResearchResultRequestParameters>;

  constructor(parameters: msdyn_SaveOpportunityResearchResultRequestParameters) {
    super("msdyn_SaveOpportunityResearchResult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveOpportunityResearchResult`;

    const body = requestBody({
      OpportunityResearchResultPayload: this.Parameters.OpportunityResearchResultPayload,
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

  async parseResponse(response: Response): Promise<msdyn_SaveOpportunityResearchResultResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SaveOpportunityResearchResultResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SaveOpportunityResearchResult action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SaveOpportunityResearchResultResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * msdyn_SaveOpportunityResearchResult response message
 *
 * `result` is the value the msdyn_SaveOpportunityResearchResult action returns (see {@link msdyn_SaveOpportunityResearchResultResult}).
 */
export class msdyn_SaveOpportunityResearchResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_SaveOpportunityResearchResultResult) {
    super("msdyn_SaveOpportunityResearchResult");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SaveOpportunityResearchResultResponse {
    return new msdyn_SaveOpportunityResearchResultResponse(
      data as msdyn_SaveOpportunityResearchResultResult
    );
  }
}
