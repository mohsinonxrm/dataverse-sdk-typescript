import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_CRACaseClosure request message
 *
 * Web API Action: msdyn_CRACaseClosure
 */
export class msdyn_CRACaseClosureRequest
  extends OrganizationRequest
  implements Executable<msdyn_CRACaseClosureResponse>
{
  constructor(
    public msdyn_ShouldResolveCase: boolean,
    public msdyn_AutomationLevel: string,
    public msdyn_McsConversationId: string,
    public msdyn_IncomingEmailId: string,
    public msdyn_IsMonitoringActive: boolean,
    public msdyn_Entity: EntityReference
  ) {
    super("msdyn_CRACaseClosure");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CRACaseClosureResponse> {
    const data = await response.json();
    return msdyn_CRACaseClosureResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_ShouldResolveCase: this.msdyn_ShouldResolveCase,
      msdyn_AutomationLevel: this.msdyn_AutomationLevel,
      msdyn_McsConversationId: this.msdyn_McsConversationId,
      msdyn_IncomingEmailId: this.msdyn_IncomingEmailId,
      msdyn_IsMonitoringActive: this.msdyn_IsMonitoringActive,
      msdyn_Entity: this.msdyn_Entity,
    };
  }
}

/**
 * msdyn_CRACaseClosure response message
 */
export class msdyn_CRACaseClosureResponse extends OrganizationResponse {
  constructor(public result: msdyn_CRACaseClosureResponse) {
    super("msdyn_CRACaseClosure");
  }

  static fromResponse(data: unknown): msdyn_CRACaseClosureResponse {
    return new msdyn_CRACaseClosureResponse((data as any).value);
  }
}
