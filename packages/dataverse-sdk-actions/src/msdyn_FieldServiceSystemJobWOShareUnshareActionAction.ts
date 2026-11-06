import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FieldServiceSystemJobWOShareUnshareAction action
 */
export interface msdyn_FieldServiceSystemJobWOShareUnshareActionResponse {
  OutputParamter: string;
}

/**
 * Parameters of the msdyn_FieldServiceSystemJobWOShareUnshareAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceSystemJobWOShareUnshareActionActionParameters {
  InputParameter: string;
  Type: number;
}

/**
 * msdyn_FieldServiceSystemJobWOShareUnshareAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_fieldservicesystemjob)
 *
 * The first argument is the id of the msdyn_fieldservicesystemjob record to call it on.
 */
export class msdyn_FieldServiceSystemJobWOShareUnshareActionAction implements Executable<msdyn_FieldServiceSystemJobWOShareUnshareActionResponse> {
  constructor(
    public readonly msdyn_fieldservicesystemjobId: string,
    public readonly parameters: msdyn_FieldServiceSystemJobWOShareUnshareActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_fieldservicesystemjobs(${this.msdyn_fieldservicesystemjobId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceSystemJobWOShareUnshareAction`;

    const body = requestBody({
      InputParameter: this.parameters.InputParameter,
      Type: this.parameters.Type,
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
  ): Promise<msdyn_FieldServiceSystemJobWOShareUnshareActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_FieldServiceSystemJobWOShareUnshareActionResponse;
    return (await response.json()) as msdyn_FieldServiceSystemJobWOShareUnshareActionResponse;
  }
}
