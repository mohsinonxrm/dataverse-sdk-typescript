import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CallMCSAgent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CallMCSAgentResponse {
  "@odata.context"?: string;
  ResponsePayload: string;
}

/**
 * Parameters of the msdyn_CallMCSAgent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CallMCSAgentActionParameters {
  Body: string;
  ConversationId: string;
  AgentSchema: string;
  AgentType: string;
  Operation: string;
  EnvironmentId: string;
}

/**
 * msdyn_CallMCSAgent action
 *
 * Unbound action
 */
export class msdyn_CallMCSAgentAction implements Executable<msdyn_CallMCSAgentResponse> {
  constructor(public readonly parameters: msdyn_CallMCSAgentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CallMCSAgent`;

    const body = requestBody({
      Body: this.parameters.Body,
      ConversationId: this.parameters.ConversationId,
      AgentSchema: this.parameters.AgentSchema,
      AgentType: this.parameters.AgentType,
      Operation: this.parameters.Operation,
      EnvironmentId: this.parameters.EnvironmentId,
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

  async parseResponse(response: Response): Promise<msdyn_CallMCSAgentResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CallMCSAgentResponse;
  }
}
