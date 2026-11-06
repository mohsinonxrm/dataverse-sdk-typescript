import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAgents_ValidateContactability action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgents_ValidateContactabilityResponse {
  "@odata.context"?: string;
  msdyn_Contacts: string;
}

/**
 * Parameters of the msdyn_SalesAgents_ValidateContactability action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgents_ValidateContactabilityActionParameters {
  msdyn_Contacts?: string;
}

/**
 * msdyn_SalesAgents_ValidateContactability action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ValidateContactabilityAction implements Executable<msdyn_SalesAgents_ValidateContactabilityResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgents_ValidateContactabilityActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ValidateContactability`;

    const body = requestBody({
      msdyn_Contacts: this.parameters.msdyn_Contacts,
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
  ): Promise<msdyn_SalesAgents_ValidateContactabilityResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAgents_ValidateContactabilityResponse;
  }
}
