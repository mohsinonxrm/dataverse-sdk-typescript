import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups action
 */
export interface msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
}

/**
 * msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups action
 *
 * Unbound action
 */
export class msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsAction implements Executable<msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse> {
  constructor(public readonly timeInterval: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups`;

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
  ): Promise<msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse> {
    const data = await response.json();
    return data as msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse;
  }
}
