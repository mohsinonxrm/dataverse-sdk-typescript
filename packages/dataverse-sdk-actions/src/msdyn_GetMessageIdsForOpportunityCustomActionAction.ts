import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetMessageIdsForOpportunityCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetMessageIdsForOpportunityCustomActionResponse {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  MessageIds: string;
  StatusCode: number;
}

/**
 * Parameters of the msdyn_GetMessageIdsForOpportunityCustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMessageIdsForOpportunityCustomActionActionParameters {
  OpportunityId?: string;
}

/**
 * msdyn_GetMessageIdsForOpportunityCustomAction action
 *
 * Unbound action
 */
export class msdyn_GetMessageIdsForOpportunityCustomActionAction implements Executable<msdyn_GetMessageIdsForOpportunityCustomActionResponse> {
  constructor(
    public readonly parameters: msdyn_GetMessageIdsForOpportunityCustomActionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMessageIdsForOpportunityCustomAction`;

    const body = requestBody({
      OpportunityId: this.parameters.OpportunityId,
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
    return (await response.json()) as msdyn_GetMessageIdsForOpportunityCustomActionResponse;
  }
}
