import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetOpportunityResearchData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOpportunityResearchDataRequestParameters {
  RequestedFields: string;
  AdditionalContext?: string;
  OpportunityId: string;
  IncludeStatusMetadata?: boolean;
  MacroAgentOrchestrationId: string;
  SalesAgentRunId?: string;
}

/**
 * msdyn_GetOpportunityResearchData request message
 *
 * Web API Action: msdyn_GetOpportunityResearchData
 */
export class msdyn_GetOpportunityResearchDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOpportunityResearchDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetOpportunityResearchDataRequestParameters>;

  constructor(parameters: msdyn_GetOpportunityResearchDataRequestParameters) {
    super("msdyn_GetOpportunityResearchData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOpportunityResearchData`;

    const body = requestBody({
      RequestedFields: this.Parameters.RequestedFields,
      AdditionalContext: this.Parameters.AdditionalContext,
      OpportunityId: this.Parameters.OpportunityId,
      IncludeStatusMetadata: this.Parameters.IncludeStatusMetadata,
      MacroAgentOrchestrationId: this.Parameters.MacroAgentOrchestrationId,
      SalesAgentRunId: this.Parameters.SalesAgentRunId,
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

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityResearchDataResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetOpportunityResearchDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetOpportunityResearchData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOpportunityResearchDataResult {
  "@odata.context"?: string;
  Citations: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  ResponseJson: string;
  Status: string;
  StatusDetails: string;
}

/**
 * msdyn_GetOpportunityResearchData response message
 *
 * `result` is the value the msdyn_GetOpportunityResearchData action returns (see {@link msdyn_GetOpportunityResearchDataResult}).
 */
export class msdyn_GetOpportunityResearchDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOpportunityResearchDataResult) {
    super("msdyn_GetOpportunityResearchData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetOpportunityResearchDataResponse {
    return new msdyn_GetOpportunityResearchDataResponse(
      data as msdyn_GetOpportunityResearchDataResult
    );
  }
}
