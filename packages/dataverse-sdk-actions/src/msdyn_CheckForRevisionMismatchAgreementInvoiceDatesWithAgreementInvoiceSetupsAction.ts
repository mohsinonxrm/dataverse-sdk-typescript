import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
 * msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups action
 *
 * Unbound action
 */
export class msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsAction implements Executable<msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse> {
  constructor(public readonly timeInterval: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetups`;

    const body: Record<string, unknown> = {
      TimeInterval: this.timeInterval,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse> {
    const data = await response.json();
    return data as msdyn_CheckForRevisionMismatchAgreementInvoiceDatesWithAgreementInvoiceSetupsResponse;
  }
}
