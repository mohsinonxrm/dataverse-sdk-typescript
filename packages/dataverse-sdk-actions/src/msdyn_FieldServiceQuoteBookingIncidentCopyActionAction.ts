import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FieldServiceQuoteBookingIncidentCopyAction action
 */
export interface msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse {
  OutputParameter: string;
}

/**
 * Parameters of the msdyn_FieldServiceQuoteBookingIncidentCopyAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceQuoteBookingIncidentCopyActionActionParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceQuoteBookingIncidentCopyAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_quotebookingincident)
 *
 * The first argument is the id of the msdyn_quotebookingincident record to call it on.
 */
export class msdyn_FieldServiceQuoteBookingIncidentCopyActionAction implements Executable<msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse> {
  constructor(
    public readonly msdyn_quotebookingincidentId: string,
    public readonly parameters: msdyn_FieldServiceQuoteBookingIncidentCopyActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_quotebookingincidents(${this.msdyn_quotebookingincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceQuoteBookingIncidentCopyAction`;

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
  ): Promise<msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse;
  }
}
