import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners request message
 *
 * Web API Action: msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners
 */
export class msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse>
{
  constructor(public solutionId: string) {
    super("msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners");
  }

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
    return msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionId: this.solutionId,
    };
  }
}

/**
 * msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners response message
 */
export class msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse) {
    super("msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse {
    return new msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse(
      (data as any).value
    );
  }
}
