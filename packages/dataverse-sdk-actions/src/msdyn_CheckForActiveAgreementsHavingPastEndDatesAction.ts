import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForActiveAgreementsHavingPastEndDates action
 */
export interface msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
  HelpLink: string;
}

/**
 * msdyn_CheckForActiveAgreementsHavingPastEndDates action
 *
 * Unbound action
 */
export class msdyn_CheckForActiveAgreementsHavingPastEndDatesAction implements Executable<msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse> {
  constructor(public readonly timeInterval: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForActiveAgreementsHavingPastEndDates`;

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
  ): Promise<msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse> {
    const data = await response.json();
    return data as msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse;
  }
}
