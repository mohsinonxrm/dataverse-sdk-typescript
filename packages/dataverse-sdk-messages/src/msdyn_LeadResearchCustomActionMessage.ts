import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_LeadResearchCustomActionResponse as msdyn_LeadResearchCustomActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_LeadResearchCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LeadResearchCustomActionRequestParameters {
  ResearchRequest?: string;
}

/**
 * msdyn_LeadResearchCustomAction request message
 *
 * Web API Action: msdyn_LeadResearchCustomAction
 */
export class msdyn_LeadResearchCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_LeadResearchCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_LeadResearchCustomActionRequestParameters>;

  constructor(parameters: msdyn_LeadResearchCustomActionRequestParameters = {}) {
    super("msdyn_LeadResearchCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LeadResearchCustomAction`;

    const body = requestBody({
      ResearchRequest: this.Parameters.ResearchRequest,
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

  async parseResponse(response: Response): Promise<msdyn_LeadResearchCustomActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_LeadResearchCustomActionResponse.fromResponse({});
    return msdyn_LeadResearchCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_LeadResearchCustomAction response message
 */
export class msdyn_LeadResearchCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_LeadResearchCustomActionResponseData) {
    super("msdyn_LeadResearchCustomAction");
  }

  static fromResponse(data: unknown): msdyn_LeadResearchCustomActionResponse {
    return new msdyn_LeadResearchCustomActionResponse(
      responseObject<msdyn_LeadResearchCustomActionResponseData>(data)
    );
  }
}
