import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetAllSuggestedActionCardsForPrioritizedLeads message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsRequestParameters {
  ClientContext?: string;
  OtherData?: string;
}

/**
 * msdyn_GetAllSuggestedActionCardsForPrioritizedLeads request message
 *
 * Web API Action: msdyn_GetAllSuggestedActionCardsForPrioritizedLeads
 */
export class msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsRequestParameters>;

  constructor(
    parameters: msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsRequestParameters = {}
  ) {
    super("msdyn_GetAllSuggestedActionCardsForPrioritizedLeads", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAllSuggestedActionCardsForPrioritizedLeads`;

    const body = requestBody({
      ClientContext: this.Parameters.ClientContext,
      OtherData: this.Parameters.OtherData,
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
  ): Promise<msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_GetAllSuggestedActionCardsForPrioritizedLeads action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_GetAllSuggestedActionCardsForPrioritizedLeads response message
 *
 * `result` is the value the msdyn_GetAllSuggestedActionCardsForPrioritizedLeads action returns (see {@link msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResult}).
 */
export class msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResult) {
    super("msdyn_GetAllSuggestedActionCardsForPrioritizedLeads");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse {
    return new msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResponse(
      data as msdyn_GetAllSuggestedActionCardsForPrioritizedLeadsResult
    );
  }
}
