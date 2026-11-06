import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_InvokeIntelligenceAction action
 */
export interface msdyn_InvokeIntelligenceActionResponse {
  Metadata: string;
  Result: string;
}

/**
 * msdyn_InvokeIntelligenceAction action
 *
 * Unbound action
 */
export class msdyn_InvokeIntelligenceActionAction implements Executable<msdyn_InvokeIntelligenceActionResponse> {
  constructor(
    public readonly context: string | undefined,
    public readonly entityReference: EntityReference | AnyEntityPayload | undefined,
    public readonly scenarioType: string,
    public readonly requestPayload: string
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_InvokeIntelligenceActionResponse> {
    const data = await response.json();
    return data as msdyn_InvokeIntelligenceActionResponse;
  }
}
