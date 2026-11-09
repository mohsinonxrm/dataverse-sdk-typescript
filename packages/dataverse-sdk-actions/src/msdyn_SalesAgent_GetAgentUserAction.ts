import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgent_GetAgentUser action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgent_GetAgentUserResponse {
  "@odata.context"?: string;
  Message: string;
  ResponseJson: string;
  Success: boolean;
}

/**
 * Parameters of the msdyn_SalesAgent_GetAgentUser action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgent_GetAgentUserActionParameters {
  SearchTerm?: string[];
}

/**
 * msdyn_SalesAgent_GetAgentUser action
 *
 * Unbound action
 */
export class msdyn_SalesAgent_GetAgentUserAction implements Executable<msdyn_SalesAgent_GetAgentUserResponse> {
  constructor(public readonly parameters: msdyn_SalesAgent_GetAgentUserActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgent_GetAgentUser`;

    const body = requestBody({
      SearchTerm: this.parameters.SearchTerm,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgent_GetAgentUserResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgent_GetAgentUserResponse;
  }
}
