import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CRACaseClosureResponse as msdyn_CRACaseClosureResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CRACaseClosure message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CRACaseClosureRequestParameters {
  msdyn_Entity: EntityReference | AnyEntityPayload;
  msdyn_ShouldResolveCase: boolean;
  msdyn_AutomationLevel: string;
  msdyn_IsMonitoringActive: boolean;
  msdyn_SuggestionType?: string;
  msdyn_IsCRAShadowMode?: boolean;
  msdyn_IncomingEmailId: string;
  msdyn_IsCustomAgentClosure?: boolean;
  msdyn_SuggestionSubtype?: string;
  msdyn_McsConversationId: string;
}

/**
 * msdyn_CRACaseClosure request message
 *
 * Web API Action: msdyn_CRACaseClosure
 */
export class msdyn_CRACaseClosureRequest
  extends OrganizationRequest
  implements Executable<msdyn_CRACaseClosureResponse>
{
  declare readonly Parameters: Readonly<msdyn_CRACaseClosureRequestParameters>;

  constructor(parameters: msdyn_CRACaseClosureRequestParameters) {
    super("msdyn_CRACaseClosure", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CRACaseClosure`;

    const body = requestBody({
      msdyn_Entity: this.Parameters.msdyn_Entity,
      msdyn_ShouldResolveCase: this.Parameters.msdyn_ShouldResolveCase,
      msdyn_AutomationLevel: this.Parameters.msdyn_AutomationLevel,
      msdyn_IsMonitoringActive: this.Parameters.msdyn_IsMonitoringActive,
      msdyn_SuggestionType: this.Parameters.msdyn_SuggestionType,
      msdyn_IsCRAShadowMode: this.Parameters.msdyn_IsCRAShadowMode,
      msdyn_IncomingEmailId: this.Parameters.msdyn_IncomingEmailId,
      msdyn_IsCustomAgentClosure: this.Parameters.msdyn_IsCustomAgentClosure,
      msdyn_SuggestionSubtype: this.Parameters.msdyn_SuggestionSubtype,
      msdyn_McsConversationId: this.Parameters.msdyn_McsConversationId,
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

  async parseResponse(response: Response): Promise<msdyn_CRACaseClosureResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CRACaseClosureResponse.fromResponse({});
    return msdyn_CRACaseClosureResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CRACaseClosure response message
 */
export class msdyn_CRACaseClosureResponse extends OrganizationResponse {
  constructor(public result: msdyn_CRACaseClosureResponseData) {
    super("msdyn_CRACaseClosure");
  }

  static fromResponse(data: unknown): msdyn_CRACaseClosureResponse {
    return new msdyn_CRACaseClosureResponse(responseObject<msdyn_CRACaseClosureResponseData>(data));
  }
}
