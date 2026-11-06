import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FieldServiceAgreementBookingIncidentStatusAction action
 */
export interface msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse {
  OutputParameter: string;
}

/**
 * Parameters of the msdyn_FieldServiceAgreementBookingIncidentStatusAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceAgreementBookingIncidentStatusActionActionParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceAgreementBookingIncidentStatusAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_agreementbookingincident)
 *
 * The first argument is the id of the msdyn_agreementbookingincident record to call it on.
 */
export class msdyn_FieldServiceAgreementBookingIncidentStatusActionAction implements Executable<msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse> {
  constructor(
    public readonly msdyn_agreementbookingincidentId: string,
    public readonly parameters: msdyn_FieldServiceAgreementBookingIncidentStatusActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_agreementbookingincidents(${this.msdyn_agreementbookingincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceAgreementBookingIncidentStatusAction`;

    const body = requestBody({
      Type: this.parameters.Type,
      InputParameter: this.parameters.InputParameter,
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
  ): Promise<msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_FieldServiceAgreementBookingIncidentStatusActionResponse;
  }
}
