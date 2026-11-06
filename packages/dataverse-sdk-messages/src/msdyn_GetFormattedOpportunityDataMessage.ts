import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetFormattedOpportunityData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFormattedOpportunityDataRequestParameters {
  OpportunityId: string;
}

/**
 * msdyn_GetFormattedOpportunityData request message
 *
 * Web API Action: msdyn_GetFormattedOpportunityData
 */
export class msdyn_GetFormattedOpportunityDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFormattedOpportunityDataResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetFormattedOpportunityDataRequestParameters>;

  constructor(parameters: msdyn_GetFormattedOpportunityDataRequestParameters) {
    super("msdyn_GetFormattedOpportunityData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFormattedOpportunityData`;

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

  async parseResponse(response: Response): Promise<msdyn_GetFormattedOpportunityDataResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetFormattedOpportunityDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetFormattedOpportunityData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetFormattedOpportunityDataResult {
  "@odata.context"?: string;
  AdditionalFieldDataJson: string;
  CreatedOn: string;
  CustomAttributesJson: string;
  FormattedCloseDate: string;
  FormattedMonetaryValue: string;
}

/**
 * msdyn_GetFormattedOpportunityData response message
 *
 * `result` is the value the msdyn_GetFormattedOpportunityData action returns (see {@link msdyn_GetFormattedOpportunityDataResult}).
 */
export class msdyn_GetFormattedOpportunityDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFormattedOpportunityDataResult) {
    super("msdyn_GetFormattedOpportunityData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetFormattedOpportunityDataResponse {
    return new msdyn_GetFormattedOpportunityDataResponse(
      data as msdyn_GetFormattedOpportunityDataResult
    );
  }
}
