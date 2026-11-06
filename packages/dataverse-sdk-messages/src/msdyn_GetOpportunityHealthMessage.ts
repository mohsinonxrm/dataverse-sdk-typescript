import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetOpportunityHealth message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOpportunityHealthRequestParameters {
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetOpportunityHealth request message
 *
 * Web API Action: msdyn_GetOpportunityHealth
 */
export class msdyn_GetOpportunityHealthRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOpportunityHealthResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetOpportunityHealthRequestParameters>;

  constructor(parameters: msdyn_GetOpportunityHealthRequestParameters) {
    super("msdyn_GetOpportunityHealth", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOpportunityHealth`;

    const body = requestBody({
      msdyn_OpportunityId: this.Parameters.msdyn_OpportunityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetOpportunityHealthResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetOpportunityHealthResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetOpportunityHealth action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOpportunityHealthResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  Result: string;
}

/**
 * msdyn_GetOpportunityHealth response message
 *
 * `result` is the value the msdyn_GetOpportunityHealth action returns (see {@link msdyn_GetOpportunityHealthResult}).
 */
export class msdyn_GetOpportunityHealthResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOpportunityHealthResult) {
    super("msdyn_GetOpportunityHealth");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetOpportunityHealthResponse {
    return new msdyn_GetOpportunityHealthResponse(data as msdyn_GetOpportunityHealthResult);
  }
}
