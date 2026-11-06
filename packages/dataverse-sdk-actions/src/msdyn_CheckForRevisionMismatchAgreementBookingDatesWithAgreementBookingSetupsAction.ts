import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups action
 */
export interface msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
}

/**
 * Parameters of the msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsActionParameters {
  TimeInterval: string;
}

/**
 * msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups action
 *
 * Unbound action
 */
export class msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsAction implements Executable<msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse> {
  constructor(
    public readonly parameters: msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups`;

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
  ): Promise<msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse;
  }
}
