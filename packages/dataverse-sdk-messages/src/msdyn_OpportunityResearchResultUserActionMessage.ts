import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_OpportunityResearchResultUserActionResponse as msdyn_OpportunityResearchResultUserActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_OpportunityResearchResultUserAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OpportunityResearchResultUserActionRequestParameters {
  Id: string;
  Action: string;
  Topic: string;
  MacroAgentOrchestrationId: string;
  OpportunityId: string;
}

/**
 * msdyn_OpportunityResearchResultUserAction request message
 *
 * Web API Action: msdyn_OpportunityResearchResultUserAction
 */
export class msdyn_OpportunityResearchResultUserActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_OpportunityResearchResultUserActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_OpportunityResearchResultUserActionRequestParameters>;

  constructor(parameters: msdyn_OpportunityResearchResultUserActionRequestParameters) {
    super("msdyn_OpportunityResearchResultUserAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OpportunityResearchResultUserAction`;

    const body = requestBody({
      Id: this.Parameters.Id,
      Action: this.Parameters.Action,
      Topic: this.Parameters.Topic,
      MacroAgentOrchestrationId: this.Parameters.MacroAgentOrchestrationId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_OpportunityResearchResultUserActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_OpportunityResearchResultUserActionResponse.fromResponse({});
    return msdyn_OpportunityResearchResultUserActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_OpportunityResearchResultUserAction response message
 */
export class msdyn_OpportunityResearchResultUserActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_OpportunityResearchResultUserActionResponseData) {
    super("msdyn_OpportunityResearchResultUserAction");
  }

  static fromResponse(data: unknown): msdyn_OpportunityResearchResultUserActionResponse {
    return new msdyn_OpportunityResearchResultUserActionResponse(
      responseObject<msdyn_OpportunityResearchResultUserActionResponseData>(data)
    );
  }
}
