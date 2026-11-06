import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse as msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponseData } from "./types/index.js";

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
  constructor(public timeInterval: string) {
    super("msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups`;

    const body: Record<string, unknown> = {
      TimeInterval: this.timeInterval,
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
  ): Promise<msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse> {
    const data = await response.json();
    return msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse.fromResponse(
      data
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
