import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_InvokeIntelligenceAction request message
 *
 * Web API Action: msdyn_InvokeIntelligenceAction
 */
export class msdyn_InvokeIntelligenceActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeIntelligenceActionResponse>
{
  constructor(
    public context: string,
    public entityReference: EntityReference,
    public scenarioType: string,
    public requestPayload: string
  ) {
    super("msdyn_InvokeIntelligenceAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeIntelligenceAction`;

    const body: Record<string, unknown> = {
      Context: this.context,
      entityReference: this.entityReference,
      ScenarioType: this.scenarioType,
      RequestPayload: this.requestPayload,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeIntelligenceActionResponse> {
    const data = await response.json();
    return msdyn_InvokeIntelligenceActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Context: this.context,
      entityReference: this.entityReference,
      ScenarioType: this.scenarioType,
      RequestPayload: this.requestPayload,
    };
  }
}

/**
 * msdyn_InvokeIntelligenceAction response message
 */
export class msdyn_InvokeIntelligenceActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeIntelligenceActionResponse) {
    super("msdyn_InvokeIntelligenceAction");
  }

  static fromResponse(data: unknown): msdyn_InvokeIntelligenceActionResponse {
    return new msdyn_InvokeIntelligenceActionResponse((data as any).value);
  }
}
