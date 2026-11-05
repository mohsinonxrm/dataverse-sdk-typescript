import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners action
 */
export interface msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
  HelpLink: string;
}

/**
 * msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners action
 *
 * Unbound action
 */
export class msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersAction implements Executable<msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse> {
  constructor(public readonly solutionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
    };

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
  ): Promise<msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse> {
    const data = await response.json();
    return data as msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse;
  }
}
