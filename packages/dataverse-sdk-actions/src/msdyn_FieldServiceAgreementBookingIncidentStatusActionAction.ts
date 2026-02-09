import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FieldServiceAgreementBookingIncidentStatusAction action
 */
export interface msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse {
  OutputParameter: string;
}

/**
 * msdyn_FieldServiceAgreementBookingIncidentStatusAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_agreementbookingincident)
 */
export class msdyn_FieldServiceAgreementBookingIncidentStatusActionAction implements Executable<msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse> {
  constructor(
    public readonly msdyn_agreementbookingincidentId: string,
    public readonly type: number,
    public readonly inputParameter: string
  ) {}

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
    return data as msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse;
  }
}
