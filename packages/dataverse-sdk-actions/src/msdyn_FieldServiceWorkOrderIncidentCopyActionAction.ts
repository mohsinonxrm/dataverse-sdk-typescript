import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FieldServiceWorkOrderIncidentCopyAction action
 */
export interface msdyn_FieldServiceWorkOrderIncidentCopyActionResponse {
  OutputParameter: string;
}

/**
 * msdyn_FieldServiceWorkOrderIncidentCopyAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_workorderincident)
 */
export class msdyn_FieldServiceWorkOrderIncidentCopyActionAction implements Executable<msdyn_FieldServiceWorkOrderIncidentCopyActionResponse> {
  constructor(
    public readonly msdyn_workorderincidentId: string,
    public readonly type: number,
    public readonly inputParameter: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorderincidents(${this.msdyn_workorderincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceWorkOrderIncidentCopyAction`;

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
  ): Promise<msdyn_FieldServiceWorkOrderIncidentCopyActionResponse> {
    const data = await response.json();
    return data as msdyn_FieldServiceWorkOrderIncidentCopyActionResponse;
  }
}
