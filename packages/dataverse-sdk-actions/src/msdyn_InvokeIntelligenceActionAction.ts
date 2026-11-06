import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
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
  entityReference?: EntityReference | AnyEntityPayload;
  ScenarioType: string;
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
      entityReference: this.parameters.entityReference,
      ScenarioType: this.parameters.ScenarioType,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_InvokeIntelligenceActionResponse;
  }
}
