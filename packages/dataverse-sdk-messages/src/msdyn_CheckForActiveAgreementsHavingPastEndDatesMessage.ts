import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse as msdyn_CheckForActiveAgreementsHavingPastEndDatesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForActiveAgreementsHavingPastEndDates message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForActiveAgreementsHavingPastEndDatesRequestParameters {
  TimeInterval: string;
}

/**
 * msdyn_CheckForActiveAgreementsHavingPastEndDates request message
 *
 * Web API Action: msdyn_CheckForActiveAgreementsHavingPastEndDates
 */
export class msdyn_CheckForActiveAgreementsHavingPastEndDatesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForActiveAgreementsHavingPastEndDatesRequestParameters>;

  constructor(parameters: msdyn_CheckForActiveAgreementsHavingPastEndDatesRequestParameters) {
    super("msdyn_CheckForActiveAgreementsHavingPastEndDates", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForActiveAgreementsHavingPastEndDates`;

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
  ): Promise<msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckForActiveAgreementsHavingPastEndDatesResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
