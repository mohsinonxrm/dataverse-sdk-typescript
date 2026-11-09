import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateTotalActiveRiskCount message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateTotalActiveRiskCountRequestParameters {
  OpportunityId: string;
}

/**
 * msdyn_UpdateTotalActiveRiskCount request message
 *
 * Web API Action: msdyn_UpdateTotalActiveRiskCount
 */
export class msdyn_UpdateTotalActiveRiskCountRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateTotalActiveRiskCountResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateTotalActiveRiskCountRequestParameters>;

  constructor(parameters: msdyn_UpdateTotalActiveRiskCountRequestParameters) {
    super("msdyn_UpdateTotalActiveRiskCount", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateTotalActiveRiskCount`;

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

  parseResponse(_response: Response): Promise<msdyn_UpdateTotalActiveRiskCountResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_UpdateTotalActiveRiskCountResponse());
  }
}

/**
 * msdyn_UpdateTotalActiveRiskCount response message
 */
export class msdyn_UpdateTotalActiveRiskCountResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateTotalActiveRiskCount");
  }

  static fromResponse(_data?: unknown): msdyn_UpdateTotalActiveRiskCountResponse {
    return new msdyn_UpdateTotalActiveRiskCountResponse();
  }
}
