import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse as msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponseData } from "./types/index.js";

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
  constructor(public timeInterval: string) {
    super("msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetups`;

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
  ): Promise<msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse> {
    const data = await response.json();
    return msdyn_CheckForRevisionMismatchAgreementBookingDatesWithAgreementBookingSetupsResponse.fromResponse(
      data
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
