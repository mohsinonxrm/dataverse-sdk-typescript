import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FieldServiceWorkOrderSystemStatusAction action
 */
export interface msdyn_FieldServiceWorkOrderSystemStatusActionResponse {
  OutputParameter: string;
}

/**
 * msdyn_FieldServiceWorkOrderSystemStatusAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_workorder)
 */
export class msdyn_FieldServiceWorkOrderSystemStatusActionAction implements Executable<msdyn_FieldServiceWorkOrderSystemStatusActionResponse> {
  constructor(
    public readonly msdyn_workorderId: string,
    public readonly type: number,
    public readonly inputParameter: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorders(${this.msdyn_workorderId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceWorkOrderSystemStatusAction`;

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
  ): Promise<msdyn_FieldServiceWorkOrderSystemStatusActionResponse> {
    const data = await response.json();
    return data as msdyn_FieldServiceWorkOrderSystemStatusActionResponse;
  }
}
