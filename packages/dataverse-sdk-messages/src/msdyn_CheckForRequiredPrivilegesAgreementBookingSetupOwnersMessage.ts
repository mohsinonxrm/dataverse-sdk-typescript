import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse as msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersRequestParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners request message
 *
 * Web API Action: msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners
 */
export class msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersRequestParameters>;

  constructor(
    parameters: msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersRequestParameters
  ) {
    super("msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse.fromResponse({});
    return msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners response message
 */
export class msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponseData
  ) {
    super("msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwners");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse {
    return new msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponse(
      responseObject<msdyn_CheckForRequiredPrivilegesAgreementBookingSetupOwnersResponseData>(data)
    );
  }
}
