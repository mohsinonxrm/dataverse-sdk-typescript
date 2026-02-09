import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FieldServiceAgreementBookingIncidentStatusAction request message
 *
 * Web API Action: msdyn_FieldServiceAgreementBookingIncidentStatusAction
 */
export class msdyn_FieldServiceAgreementBookingIncidentStatusActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse>
{
  constructor(
    public msdyn_agreementbookingincidentId: string,
    public type: number,
    public inputParameter: string
  ) {
    super("msdyn_FieldServiceAgreementBookingIncidentStatusAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_agreementbookingincidents(${this.msdyn_agreementbookingincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceAgreementBookingIncidentStatusAction`;

    const body: Record<string, unknown> = {
      Type: this.type,
      InputParameter: this.inputParameter,
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
  ): Promise<msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse> {
    const data = await response.json();
    return msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_agreementbookingincidentId,
      Type: this.type,
      InputParameter: this.inputParameter,
    };
  }
}

/**
 * msdyn_FieldServiceAgreementBookingIncidentStatusAction response message
 */
export class msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse) {
    super("msdyn_FieldServiceAgreementBookingIncidentStatusAction");
  }

  static fromResponse(
    data: unknown
  ): msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse {
    return new msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse((data as any).value);
  }
}
