import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_OpportunityResearchResultUserAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OpportunityResearchResultUserActionRequestParameters {
  Id: string;
  MacroAgentOrchestrationId: string;
  Action: string;
  Topic: string;
  OpportunityId: string;
  IsCallFromNba?: boolean;
}

/**
 * msdyn_OpportunityResearchResultUserAction request message
 *
 * Web API Action: msdyn_OpportunityResearchResultUserAction
 */
export class msdyn_OpportunityResearchResultUserActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_OpportunityResearchResultUserActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_OpportunityResearchResultUserActionRequestParameters>;

  constructor(parameters: msdyn_OpportunityResearchResultUserActionRequestParameters) {
    super("msdyn_OpportunityResearchResultUserAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OpportunityResearchResultUserAction`;

    const body = requestBody({
      Id: this.Parameters.Id,
      MacroAgentOrchestrationId: this.Parameters.MacroAgentOrchestrationId,
      Action: this.Parameters.Action,
      Topic: this.Parameters.Topic,
      OpportunityId: this.Parameters.OpportunityId,
      IsCallFromNba: this.Parameters.IsCallFromNba,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_OpportunityResearchResultUserActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_OpportunityResearchResultUserActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_OpportunityResearchResultUserAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OpportunityResearchResultUserActionResult {
  "@odata.context"?: string;
  Success: boolean;
  Timestamp: string;
}

/**
 * msdyn_OpportunityResearchResultUserAction response message
 *
 * `result` is the value the msdyn_OpportunityResearchResultUserAction action returns (see {@link msdyn_OpportunityResearchResultUserActionResult}).
 */
export class msdyn_OpportunityResearchResultUserActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_OpportunityResearchResultUserActionResult) {
    super("msdyn_OpportunityResearchResultUserAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_OpportunityResearchResultUserActionResponse {
    return new msdyn_OpportunityResearchResultUserActionResponse(
      data as msdyn_OpportunityResearchResultUserActionResult
    );
  }
}
