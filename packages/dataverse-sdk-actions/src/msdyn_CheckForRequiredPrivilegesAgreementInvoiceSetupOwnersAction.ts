import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
 * Parameters of the msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersActionParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners action
 *
 * Unbound action
 */
export class msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersAction implements Executable<msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse> {
  constructor(
    public readonly parameters: msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners`;

    const body = requestBody({
      SolutionId: this.parameters.SolutionId,
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
  ): Promise<msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse;
    return (await response.json()) as msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse;
  }
}
