import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse as msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsRequestParameters {
  TimeInterval: string;
}

/**
 * msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups request message
 *
 * Web API Action: msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups
 */
export class msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsRequest
  extends OrganizationRequest
  implements
    Executable<msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsRequestParameters>;

  constructor(
    parameters: msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsRequestParameters
  ) {
    super("msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups", {
      ...parameters,
    });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups`;

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
  ): Promise<msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups response message
 */
export class msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponseData
  ) {
    super("msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups");
  }

  static fromResponse(
    data: unknown
  ): msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse {
    return new msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse(
      responseObject<msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponseData>(
        data
      )
    );
  }
}
