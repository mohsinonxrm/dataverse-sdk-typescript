import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FieldServiceWorkOrderIncidentStatusAction action
 */
export interface msdyn_FieldServiceWorkOrderIncidentStatusActionResponse {
  OutputParameter: string;
}

/**
 * msdyn_FieldServiceWorkOrderIncidentStatusAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_workorderincident)
 */
export class msdyn_FieldServiceWorkOrderIncidentStatusActionAction implements Executable<msdyn_FieldServiceWorkOrderIncidentStatusActionResponse> {
  constructor(
    public readonly msdyn_workorderincidentId: string,
    public readonly type: number,
    public readonly inputParameter: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorderincidents(${this.msdyn_workorderincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceWorkOrderIncidentStatusAction`;

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
  ): Promise<msdyn_FieldServiceWorkOrderIncidentStatusActionResponse> {
    const data = await response.json();
    return data as msdyn_FieldServiceWorkOrderIncidentStatusActionResponse;
  }
}
