import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetFormattedOpportunityData action
 */
export interface msdyn_GetFormattedOpportunityDataResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetFormattedOpportunityDataResponse;
    return (await response.json()) as msdyn_GetFormattedOpportunityDataResponse;
  }
}
