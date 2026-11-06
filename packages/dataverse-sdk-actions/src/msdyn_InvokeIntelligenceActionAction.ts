import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_InvokeIntelligenceAction action
 */
export interface msdyn_InvokeIntelligenceActionResponse {
  Metadata: string;
  Result: string;
}

/**
 * Parameters of the msdyn_InvokeIntelligenceAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeIntelligenceActionActionParameters {
  Context?: string;
  ScenarioType: string;
  entityReference?: EntityReference | AnyEntityPayload;
  RequestPayload: string;
}

/**
 * msdyn_InvokeIntelligenceAction action
 *
 * Unbound action
 */
export class msdyn_InvokeIntelligenceActionAction implements Executable<msdyn_InvokeIntelligenceActionResponse> {
  constructor(public readonly parameters: msdyn_InvokeIntelligenceActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeIntelligenceAction`;

    const body = requestBody({
      Context: this.parameters.Context,
      ScenarioType: this.parameters.ScenarioType,
      entityReference: this.parameters.entityReference,
      RequestPayload: this.parameters.RequestPayload,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeIntelligenceActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_InvokeIntelligenceActionResponse;
    return (await response.json()) as msdyn_InvokeIntelligenceActionResponse;
  }
}
