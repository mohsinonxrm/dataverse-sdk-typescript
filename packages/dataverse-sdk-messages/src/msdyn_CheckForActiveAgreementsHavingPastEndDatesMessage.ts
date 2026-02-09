import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckForActiveAgreementsHavingPastEndDates request message
 *
 * Web API Action: msdyn_CheckForActiveAgreementsHavingPastEndDates
 */
export class msdyn_CheckForActiveAgreementsHavingPastEndDatesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse>
{
  constructor(public timeInterval: string) {
    super("msdyn_CheckForActiveAgreementsHavingPastEndDates");
  }

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
    return msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      TimeInterval: this.timeInterval,
    };
  }
}

/**
 * msdyn_CheckForActiveAgreementsHavingPastEndDates response message
 */
export class msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse) {
    super("msdyn_CheckForActiveAgreementsHavingPastEndDates");
  }

  static fromResponse(data: unknown): msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse {
    return new msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse((data as any).value);
  }
}
