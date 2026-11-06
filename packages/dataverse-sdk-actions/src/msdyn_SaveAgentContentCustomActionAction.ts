import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SaveAgentContentCustomAction action
 */
export interface msdyn_SaveAgentContentCustomActionResponse {
  Response: string;
  IsSuccess: boolean;
  StatusCode: number;
  ErrorMessage: string;
}

/**
 * Parameters of the msdyn_SaveAgentContentCustomAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SaveAgentContentCustomActionActionParameters {
  AgentContent?: string;
}

/**
 * msdyn_SaveAgentContentCustomAction action
 *
 * Unbound action
 */
export class msdyn_SaveAgentContentCustomActionAction implements Executable<msdyn_SaveAgentContentCustomActionResponse> {
  constructor(
    public readonly parameters: msdyn_SaveAgentContentCustomActionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SaveAgentContentCustomAction`;

    const body = requestBody({
      AgentContent: this.parameters.AgentContent,
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

  async parseResponse(response: Response): Promise<msdyn_SaveAgentContentCustomActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SaveAgentContentCustomActionResponse;
  }
}
