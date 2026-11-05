import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_CRACaseClosure action
 */
export interface msdyn_CRACaseClosureResponse {
  msdyn_Status: string;
}

/**
 * msdyn_CRACaseClosure action
 *
 * Unbound action
 */
export class msdyn_CRACaseClosureAction implements Executable<msdyn_CRACaseClosureResponse> {
  constructor(
    public readonly msdyn_ShouldResolveCase: boolean,
    public readonly msdyn_AutomationLevel: string,
    public readonly msdyn_McsConversationId: string,
    public readonly msdyn_IncomingEmailId: string,
    public readonly msdyn_IsMonitoringActive: boolean,
    public readonly msdyn_Entity: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CRACaseClosure`;

    const body: Record<string, unknown> = {
      msdyn_ShouldResolveCase: this.msdyn_ShouldResolveCase,
      msdyn_AutomationLevel: this.msdyn_AutomationLevel,
      msdyn_McsConversationId: this.msdyn_McsConversationId,
      msdyn_IncomingEmailId: this.msdyn_IncomingEmailId,
      msdyn_IsMonitoringActive: this.msdyn_IsMonitoringActive,
      msdyn_Entity: this.msdyn_Entity,
    };

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
    const data = await response.json();
    return data as msdyn_CRACaseClosureResponse;
  }
}
