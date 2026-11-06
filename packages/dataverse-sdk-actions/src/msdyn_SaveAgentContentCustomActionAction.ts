import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SaveAgentContentCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SaveAgentContentCustomActionResponse {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
  Response: string;
  StatusCode: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SaveAgentContentCustomActionResponse;
  }
}
