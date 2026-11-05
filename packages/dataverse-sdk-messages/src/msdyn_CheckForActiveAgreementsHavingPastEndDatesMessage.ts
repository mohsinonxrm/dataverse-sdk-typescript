import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse as msdyn_CheckForActiveAgreementsHavingPastEndDatesResponseData } from "./types/index.js";

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
        "content-type": "application/json",
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
}

/**
 * msdyn_CheckForActiveAgreementsHavingPastEndDates response message
 */
export class msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForActiveAgreementsHavingPastEndDatesResponseData) {
    super("msdyn_CheckForActiveAgreementsHavingPastEndDates");
  }

  static fromResponse(data: unknown): msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse {
    return new msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse(
      responseObject<msdyn_CheckForActiveAgreementsHavingPastEndDatesResponseData>(data)
    );
  }
}
