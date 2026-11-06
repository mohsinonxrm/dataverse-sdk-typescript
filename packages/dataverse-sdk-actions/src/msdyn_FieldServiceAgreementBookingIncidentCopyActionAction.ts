import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FieldServiceAgreementBookingIncidentCopyAction action
 */
export interface msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse {
  OutputParameter: string;
}

/**
 * Parameters of the msdyn_FieldServiceAgreementBookingIncidentCopyAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceAgreementBookingIncidentCopyActionActionParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceAgreementBookingIncidentCopyAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_agreementbookingincident)
 *
 * The first argument is the id of the msdyn_agreementbookingincident record to call it on.
 */
export class msdyn_FieldServiceAgreementBookingIncidentCopyActionAction implements Executable<msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse> {
  constructor(
    public readonly msdyn_agreementbookingincidentId: string,
    public readonly parameters: msdyn_FieldServiceAgreementBookingIncidentCopyActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_agreementbookingincidents(${this.msdyn_agreementbookingincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceAgreementBookingIncidentCopyAction`;

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
  ): Promise<msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse;
    return (await response.json()) as msdyn_FieldServiceAgreementBookingIncidentCopyActionResponse;
  }
}
