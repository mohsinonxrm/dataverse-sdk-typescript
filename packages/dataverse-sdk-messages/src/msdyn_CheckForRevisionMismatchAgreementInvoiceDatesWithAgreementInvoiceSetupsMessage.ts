import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse as msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsRequestParameters {
  TimeInterval: string;
}

/**
 * msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups request message
 *
 * Web API Action: msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups
 */
export class msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsRequest
  extends OrganizationRequest
  implements
    Executable<msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsRequestParameters>;

  constructor(
    parameters: msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsRequestParameters
  ) {
    super("msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups", {
      ...parameters,
    });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups`;

    const body = requestBody({
      TimeInterval: this.Parameters.TimeInterval,
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
  ): Promise<msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups response message
 */
export class msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponseData
  ) {
    super("msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse {
    return new msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse(
      responseObject<msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponseData>(
        data
      )
    );
  }
}
