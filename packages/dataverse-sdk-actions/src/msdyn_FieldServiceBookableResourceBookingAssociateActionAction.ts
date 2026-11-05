import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FieldServiceBookableResourceBookingAssociateAction action
 */
export interface msdyn_FieldServiceBookableResourceBookingAssociateActionResponse {
  OutputParameter: string;
}

/**
 * msdyn_FieldServiceBookableResourceBookingAssociateAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bookableresourcebooking)
 */
export class msdyn_FieldServiceBookableResourceBookingAssociateActionAction implements Executable<msdyn_FieldServiceBookableResourceBookingAssociateActionResponse> {
  constructor(
    public readonly bookableresourcebookingId: string,
    public readonly type: number,
    public readonly inputParameter: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bookableresourcebookings(${this.bookableresourcebookingId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceBookableResourceBookingAssociateAction`;

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
  ): Promise<msdyn_FieldServiceBookableResourceBookingAssociateActionResponse> {
    const data = await response.json();
    return data as msdyn_FieldServiceBookableResourceBookingAssociateActionResponse;
  }
}
