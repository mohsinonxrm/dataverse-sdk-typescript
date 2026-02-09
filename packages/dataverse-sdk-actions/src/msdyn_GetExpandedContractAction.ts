import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetExpandedContract action
 */
export interface msdyn_GetExpandedContractResponse {
  msdyn_ExpandedContract: string;
}

/**
 * msdyn_GetExpandedContract action
 *
 * Unbound action
 */
export class msdyn_GetExpandedContractAction implements Executable<msdyn_GetExpandedContractResponse> {
  constructor(
    public readonly msdyn_RuleSet: string,
    public readonly msdyn_OrganizationInfo: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetExpandedContract`;

    const body: Record<string, unknown> = {
      msdyn_RuleSet: this.msdyn_RuleSet,
      msdyn_OrganizationInfo: this.msdyn_OrganizationInfo,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetExpandedContractResponse> {
    const data = await response.json();
    return data as msdyn_GetExpandedContractResponse;
  }
}
