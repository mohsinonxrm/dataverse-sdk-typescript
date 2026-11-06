import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
 * Parameters of the msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersActionParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners action
 *
 * Unbound action
 */
export class msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersAction implements Executable<msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse> {
  constructor(
    public readonly parameters: msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners`;

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
  ): Promise<msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse;
  }
}
