import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups action
 */
export interface msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
  HelpLink: string;
}

/**
 * Parameters of the msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsActionParameters {
  TimeInterval: string;
}

/**
 * msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups action
 *
 * Unbound action
 */
export class msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsAction implements Executable<msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse> {
  constructor(
    public readonly parameters: msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups`;

    const body = requestBody({
      TimeInterval: this.parameters.TimeInterval,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse;
    return (await response.json()) as msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse;
  }
}
