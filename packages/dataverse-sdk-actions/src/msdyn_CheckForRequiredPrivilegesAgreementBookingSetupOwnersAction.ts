import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners action
 */
export interface msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
  HelpLink: string;
}

/**
 * msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners action
 *
 * Unbound action
 */
export class msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersAction implements Executable<msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse> {
  constructor(public readonly solutionId: string) {}

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
    return data as msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse;
  }
}
