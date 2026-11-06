import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CRACaseClosureResponse as msdyn_CRACaseClosureResponseData } from "./types/index.js";

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
    public msdyn_Entity: EntityReference | AnyEntityPayload
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CRACaseClosureResponse> {
    const data = await response.json();
    return msdyn_CRACaseClosureResponse.fromResponse(data);
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
