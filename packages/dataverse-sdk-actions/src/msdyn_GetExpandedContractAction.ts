import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetExpandedContract action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetExpandedContractResponse {
  "@odata.context"?: string;
  msdyn_ExpandedContract: string;
}

/**
 * Parameters of the msdyn_GetExpandedContract action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetExpandedContractActionParameters {
  msdyn_RuleSet: string;
  msdyn_OrganizationInfo: string;
}

/**
 * msdyn_GetExpandedContract action
 *
 * Unbound action
 */
export class msdyn_GetExpandedContractAction implements Executable<msdyn_GetExpandedContractResponse> {
  constructor(public readonly parameters: msdyn_GetExpandedContractActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetExpandedContract`;

    const body = requestBody({
      msdyn_RuleSet: this.parameters.msdyn_RuleSet,
      msdyn_OrganizationInfo: this.parameters.msdyn_OrganizationInfo,
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

  async parseResponse(response: Response): Promise<msdyn_GetExpandedContractResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetExpandedContractResponse;
  }
}
