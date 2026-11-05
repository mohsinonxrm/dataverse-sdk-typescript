import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FieldServiceQuoteBookingIncidentCopyAction request message
 *
 * Web API Action: msdyn_FieldServiceQuoteBookingIncidentCopyAction
 */
export class msdyn_FieldServiceQuoteBookingIncidentCopyActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse>
{
  constructor(
    public msdyn_quotebookingincidentId: string,
    public type: number,
    public inputParameter: string
  ) {
    super("msdyn_FieldServiceQuoteBookingIncidentCopyAction");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse> {
    const data = await response.json();
    return msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_quotebookingincidentId,
      Type: this.type,
      InputParameter: this.inputParameter,
    };
  }
}

/**
 * msdyn_FieldServiceQuoteBookingIncidentCopyAction response message
 */
export class msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse) {
    super("msdyn_FieldServiceQuoteBookingIncidentCopyAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse {
    return new msdyn_FieldServiceQuoteBookingIncidentCopyActionResponse((data as any).value);
  }
}
