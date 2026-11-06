import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse as msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersRequestParameters {
  SolutionId: string;
}

/**
 * msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners request message
 *
 * Web API Action: msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners
 */
export class msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersRequestParameters>;

  constructor(
    parameters: msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersRequestParameters
  ) {
    super("msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners`;

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
  ): Promise<msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse.fromResponse({});
    return msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners response message
 */
export class msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponseData
  ) {
    super("msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwners");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse {
    return new msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponse(
      responseObject<msdyn_CheckForRequiredPrivilegesAgreementInvoiceSetupOwnersResponseData>(data)
    );
  }
}
