import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesDataQualityAgent_SaveAgentResponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_SaveAgentResponseResponse {
  "@odata.context"?: string;
  ErrorMessage: string;
  IsSuccess: boolean;
}

/**
 * Parameters of the msdyn_SalesDataQualityAgent_SaveAgentResponse action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_SaveAgentResponseActionParameters {
  AgentContent: string;
}

/**
 * msdyn_SalesDataQualityAgent_SaveAgentResponse action
 *
 * Unbound action
 */
export class msdyn_SalesDataQualityAgent_SaveAgentResponseAction implements Executable<msdyn_SalesDataQualityAgent_SaveAgentResponseResponse> {
  constructor(
    public readonly parameters: msdyn_SalesDataQualityAgent_SaveAgentResponseActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_SaveAgentResponse`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesDataQualityAgent_SaveAgentResponseResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesDataQualityAgent_SaveAgentResponseResponse;
  }
}
