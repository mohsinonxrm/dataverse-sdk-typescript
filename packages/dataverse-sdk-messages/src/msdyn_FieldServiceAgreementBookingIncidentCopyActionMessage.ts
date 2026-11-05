import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse as msdyn_FieldServiceAgreementBookingIncidentCopyActionResponseData } from "./types/index.js";

/**
 * msdyn_FieldServiceAgreementBookingIncidentCopyAction request message
 *
 * Web API Action: msdyn_FieldServiceAgreementBookingIncidentCopyAction
 */
export class msdyn_FieldServiceAgreementBookingIncidentCopyActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse>
{
  constructor(
    public msdyn_agreementbookingincidentId: string,
    public type: number,
    public inputParameter: string
  ) {
    super("msdyn_FieldServiceAgreementBookingIncidentCopyAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_agreementbookingincidents(${this.msdyn_agreementbookingincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceAgreementBookingIncidentCopyAction`;

    const body: Record<string, unknown> = {
      Type: this.type,
      InputParameter: this.inputParameter,
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
  ): Promise<msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse> {
    const data = await response.json();
    return msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse.fromResponse(data);
  }
}

/**
 * msdyn_FieldServiceAgreementBookingIncidentCopyAction response message
 */
export class msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceAgreementBookingIncidentCopyActionResponseData) {
    super("msdyn_FieldServiceAgreementBookingIncidentCopyAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse {
    return new msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse(
      responseObject<msdyn_FieldServiceAgreementBookingIncidentCopyActionResponseData>(data)
    );
  }
}
