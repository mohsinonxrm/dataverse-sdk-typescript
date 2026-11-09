import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetFormattedOpportunityData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetFormattedOpportunityDataResponse {
  "@odata.context"?: string;
  AdditionalFieldDataJson: string;
  CreatedOn: string;
  CustomAttributesJson: string;
  FormattedCloseDate: string;
  FormattedMonetaryValue: string;
}

/**
 * Parameters of the msdyn_GetFormattedOpportunityData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFormattedOpportunityDataActionParameters {
  OpportunityId: string;
}

/**
 * msdyn_GetFormattedOpportunityData action
 *
 * Unbound action
 */
export class msdyn_GetFormattedOpportunityDataAction implements Executable<msdyn_GetFormattedOpportunityDataResponse> {
  constructor(public readonly parameters: msdyn_GetFormattedOpportunityDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFormattedOpportunityData`;

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

  async parseResponse(response: Response): Promise<msdyn_GetFormattedOpportunityDataResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetFormattedOpportunityDataResponse;
  }
}
