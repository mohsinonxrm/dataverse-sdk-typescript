import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FieldServiceWorkOrderSystemStatusAction action
 */
export interface msdyn_FieldServiceWorkOrderSystemStatusActionResponse {
  OutputParameter: string;
}

/**
 * Parameters of the msdyn_FieldServiceWorkOrderSystemStatusAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceWorkOrderSystemStatusActionActionParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceWorkOrderSystemStatusAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_workorder)
 *
 * The first argument is the id of the msdyn_workorder record to call it on.
 */
export class msdyn_FieldServiceWorkOrderSystemStatusActionAction implements Executable<msdyn_FieldServiceWorkOrderSystemStatusActionResponse> {
  constructor(
    public readonly msdyn_workorderId: string,
    public readonly parameters: msdyn_FieldServiceWorkOrderSystemStatusActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorders(${this.msdyn_workorderId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceWorkOrderSystemStatusAction`;

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
  ): Promise<msdyn_FieldServiceWorkOrderSystemStatusActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_FieldServiceWorkOrderSystemStatusActionResponse;
    return (await response.json()) as msdyn_FieldServiceWorkOrderSystemStatusActionResponse;
  }
}
