import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FieldServiceQuoteBookingIncidentCopyAction action
 */
export interface msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse {
  OutputParameter: string;
}

/**
 * msdyn_FieldServiceQuoteBookingIncidentCopyAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_quotebookingincident)
 */
export class msdyn_FieldServiceQuoteBookingIncidentCopyActionAction implements Executable<msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse> {
  constructor(
    public readonly msdyn_quotebookingincidentId: string,
    public readonly type: number,
    public readonly inputParameter: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_quotebookingincidents(${this.msdyn_quotebookingincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceQuoteBookingIncidentCopyAction`;

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
  ): Promise<msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse> {
    const data = await response.json();
    return data as msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse;
  }
}
