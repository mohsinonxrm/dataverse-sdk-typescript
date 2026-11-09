import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetKeyOpportunityStakeholders message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKeyOpportunityStakeholdersRequestParameters {
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetKeyOpportunityStakeholders request message
 *
 * Web API Action: msdyn_GetKeyOpportunityStakeholders
 */
export class msdyn_GetKeyOpportunityStakeholdersRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetKeyOpportunityStakeholdersResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetKeyOpportunityStakeholdersRequestParameters>;

  constructor(parameters: msdyn_GetKeyOpportunityStakeholdersRequestParameters) {
    super("msdyn_GetKeyOpportunityStakeholders", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKeyOpportunityStakeholders`;

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

  async parseResponse(response: Response): Promise<msdyn_GetKeyOpportunityStakeholdersResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetKeyOpportunityStakeholdersResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetKeyOpportunityStakeholders action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetKeyOpportunityStakeholdersResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  Result: string;
}

/**
 * msdyn_GetKeyOpportunityStakeholders response message
 *
 * `result` is the value the msdyn_GetKeyOpportunityStakeholders action returns (see {@link msdyn_GetKeyOpportunityStakeholdersResult}).
 */
export class msdyn_GetKeyOpportunityStakeholdersResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetKeyOpportunityStakeholdersResult) {
    super("msdyn_GetKeyOpportunityStakeholders");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetKeyOpportunityStakeholdersResponse {
    return new msdyn_GetKeyOpportunityStakeholdersResponse(
      data as msdyn_GetKeyOpportunityStakeholdersResult
    );
  }
}
