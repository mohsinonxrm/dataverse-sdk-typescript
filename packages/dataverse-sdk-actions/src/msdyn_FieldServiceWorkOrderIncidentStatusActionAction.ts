import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FieldServiceWorkOrderIncidentStatusAction action
 */
export interface msdyn_FieldServiceWorkOrderIncidentStatusActionResponse {
  OutputParameter: string;
}

/**
 * Parameters of the msdyn_FieldServiceWorkOrderIncidentStatusAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceWorkOrderIncidentStatusActionActionParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceWorkOrderIncidentStatusAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_workorderincident)
 *
 * The first argument is the id of the msdyn_workorderincident record to call it on.
 */
export class msdyn_FieldServiceWorkOrderIncidentStatusActionAction implements Executable<msdyn_FieldServiceWorkOrderIncidentStatusActionResponse> {
  constructor(
    public readonly msdyn_workorderincidentId: string,
    public readonly parameters: msdyn_FieldServiceWorkOrderIncidentStatusActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorderincidents(${this.msdyn_workorderincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceWorkOrderIncidentStatusAction`;

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
  ): Promise<msdyn_FieldServiceWorkOrderIncidentStatusActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_FieldServiceWorkOrderIncidentStatusActionResponse;
    return (await response.json()) as msdyn_FieldServiceWorkOrderIncidentStatusActionResponse;
  }
}
