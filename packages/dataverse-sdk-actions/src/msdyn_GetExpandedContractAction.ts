import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetExpandedContract action
 */
export interface msdyn_GetExpandedContractResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetExpandedContractResponse;
  }
}
