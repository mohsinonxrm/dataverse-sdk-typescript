import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_CRACaseClosure action
 */
export interface msdyn_CRACaseClosureResponse {
  msdyn_Status: string;
}

/**
 * Parameters of the msdyn_CRACaseClosure action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CRACaseClosureActionParameters {
  msdyn_ShouldResolveCase: boolean;
  msdyn_AutomationLevel: string;
  msdyn_McsConversationId: string;
  msdyn_IncomingEmailId: string;
  msdyn_IsMonitoringActive: boolean;
  msdyn_Entity: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CRACaseClosure action
 *
 * Unbound action
 */
export class msdyn_CRACaseClosureAction implements Executable<msdyn_CRACaseClosureResponse> {
  constructor(public readonly parameters: msdyn_CRACaseClosureActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CRACaseClosure`;

    const body = requestBody({
      msdyn_ShouldResolveCase: this.parameters.msdyn_ShouldResolveCase,
      msdyn_AutomationLevel: this.parameters.msdyn_AutomationLevel,
      msdyn_McsConversationId: this.parameters.msdyn_McsConversationId,
      msdyn_IncomingEmailId: this.parameters.msdyn_IncomingEmailId,
      msdyn_IsMonitoringActive: this.parameters.msdyn_IsMonitoringActive,
      msdyn_Entity: this.parameters.msdyn_Entity,
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
    if (response.status === 204) return {} as msdyn_CRACaseClosureResponse;
    return (await response.json()) as msdyn_CRACaseClosureResponse;
  }
}
