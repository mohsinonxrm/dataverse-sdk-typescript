import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetKeyOpportunitySignals message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKeyOpportunitySignalsRequestParameters {
  msdyn_OpportunityId: string;
}

/**
 * msdyn_GetKeyOpportunitySignals request message
 *
 * Web API Action: msdyn_GetKeyOpportunitySignals
 */
export class msdyn_GetKeyOpportunitySignalsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetKeyOpportunitySignalsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetKeyOpportunitySignalsRequestParameters>;

  constructor(parameters: msdyn_GetKeyOpportunitySignalsRequestParameters) {
    super("msdyn_GetKeyOpportunitySignals", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKeyOpportunitySignals`;

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

  async parseResponse(response: Response): Promise<msdyn_GetKeyOpportunitySignalsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetKeyOpportunitySignalsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetKeyOpportunitySignals action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetKeyOpportunitySignalsResult {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  Result: string;
}

/**
 * msdyn_GetKeyOpportunitySignals response message
 *
 * `result` is the value the msdyn_GetKeyOpportunitySignals action returns (see {@link msdyn_GetKeyOpportunitySignalsResult}).
 */
export class msdyn_GetKeyOpportunitySignalsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetKeyOpportunitySignalsResult) {
    super("msdyn_GetKeyOpportunitySignals");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetKeyOpportunitySignalsResponse {
    return new msdyn_GetKeyOpportunitySignalsResponse(data as msdyn_GetKeyOpportunitySignalsResult);
  }
}
