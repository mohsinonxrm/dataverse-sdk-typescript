import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetMessageIdsForOpportunityCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMessageIdsForOpportunityCustomActionRequestParameters {
  OpportunityId?: string;
}

/**
 * msdyn_GetMessageIdsForOpportunityCustomAction request message
 *
 * Web API Action: msdyn_GetMessageIdsForOpportunityCustomAction
 */
export class msdyn_GetMessageIdsForOpportunityCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetMessageIdsForOpportunityCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetMessageIdsForOpportunityCustomActionRequestParameters>;

  constructor(parameters: msdyn_GetMessageIdsForOpportunityCustomActionRequestParameters = {}) {
    super("msdyn_GetMessageIdsForOpportunityCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMessageIdsForOpportunityCustomAction`;

    const body = requestBody({
      OpportunityId: this.Parameters.OpportunityId,
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
  ): Promise<msdyn_GetMessageIdsForOpportunityCustomActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetMessageIdsForOpportunityCustomActionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_GetMessageIdsForOpportunityCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetMessageIdsForOpportunityCustomActionResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  MessageIds: string;
  StatusCode: number;
}

/**
 * msdyn_GetMessageIdsForOpportunityCustomAction response message
 *
 * `result` is the value the msdyn_GetMessageIdsForOpportunityCustomAction action returns (see {@link msdyn_GetMessageIdsForOpportunityCustomActionResult}).
 */
export class msdyn_GetMessageIdsForOpportunityCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMessageIdsForOpportunityCustomActionResult) {
    super("msdyn_GetMessageIdsForOpportunityCustomAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetMessageIdsForOpportunityCustomActionResponse {
    return new msdyn_GetMessageIdsForOpportunityCustomActionResponse(
      data as msdyn_GetMessageIdsForOpportunityCustomActionResult
    );
  }
}
