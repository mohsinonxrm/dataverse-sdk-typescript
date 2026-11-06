import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetMessageIdsForOpportunityCustomActionResponse as msdyn_GetMessageIdsForOpportunityCustomActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetMessageIdsForOpportunityCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetMessageIdsForOpportunityCustomActionRequestParameters {
  OpportunityId?: string;
}

/**
 * msdyn_GetMessageIdsForOpportunityCustomAction request message
 *
 * Web API Action: msdyn_GetMessageIdsForOpportunityCustomAction
 */
export class msdyn_GetMessageIdsForOpportunityCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetMessageIdsForOpportunityCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetMessageIdsForOpportunityCustomActionRequestParameters>;

  constructor(parameters: msdyn_GetMessageIdsForOpportunityCustomActionRequestParameters = {}) {
    super("msdyn_GetMessageIdsForOpportunityCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetMessageIdsForOpportunityCustomAction`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetMessageIdsForOpportunityCustomActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetMessageIdsForOpportunityCustomActionResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_GetMessageIdsForOpportunityCustomAction response message
 */
export class msdyn_GetMessageIdsForOpportunityCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetMessageIdsForOpportunityCustomActionResponseData) {
    super("msdyn_GetMessageIdsForOpportunityCustomAction");
  }

  static fromResponse(data: unknown): msdyn_GetMessageIdsForOpportunityCustomActionResponse {
    return new msdyn_GetMessageIdsForOpportunityCustomActionResponse(
      responseObject<msdyn_GetMessageIdsForOpportunityCustomActionResponseData>(data)
    );
  }
}
