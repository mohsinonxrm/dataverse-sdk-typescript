import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsAction action
 */
export interface msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse {
  OutputParameter: string;
}

/**
 * msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_workorderincident)
 */
export class msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionAction implements Executable<msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse> {
  constructor(
    public readonly msdyn_workorderincidentId: string,
    public readonly type: number,
    public readonly inputParameter: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorderincidents(${this.msdyn_workorderincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsAction`;

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
  ): Promise<msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse> {
    const data = await response.json();
    return data as msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse;
  }
}
