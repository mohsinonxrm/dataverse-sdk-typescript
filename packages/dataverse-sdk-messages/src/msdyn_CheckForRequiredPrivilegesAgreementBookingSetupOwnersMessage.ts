import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners request message
 *
 * Web API Action: msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners
 */
export class msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse>
{
  constructor(public solutionId: string) {
    super("msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners`;

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
  ): Promise<msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse> {
    const data = await response.json();
    return msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionId: this.solutionId,
    };
  }
}

/**
 * msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners response message
 */
export class msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse) {
    super("msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse {
    return new msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse(
      (data as any).value
    );
  }
}
