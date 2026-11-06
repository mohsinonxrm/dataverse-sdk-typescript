import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetKeyOpportunitySignalsResponse as msdyn_GetKeyOpportunitySignalsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetKeyOpportunitySignalsResponse.fromResponse({});
    return msdyn_GetKeyOpportunitySignalsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetKeyOpportunitySignals response message
 */
export class msdyn_GetKeyOpportunitySignalsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetKeyOpportunitySignalsResponseData) {
    super("msdyn_GetKeyOpportunitySignals");
  }

  static fromResponse(data: unknown): msdyn_GetKeyOpportunitySignalsResponse {
    return new msdyn_GetKeyOpportunitySignalsResponse(
      responseObject<msdyn_GetKeyOpportunitySignalsResponseData>(data)
    );
  }
}
