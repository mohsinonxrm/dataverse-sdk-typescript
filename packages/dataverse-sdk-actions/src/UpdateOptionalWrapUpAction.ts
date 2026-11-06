import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UpdateOptionalWrapUp action
 */
export interface UpdateOptionalWrapUpResponse {
  // No content returned
}

/**
 * Parameters of the UpdateOptionalWrapUp action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateOptionalWrapUpActionParameters {
  Payload: string;
  ApiVersion: string;
}

/**
 * UpdateOptionalWrapUp action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocsession)
 *
 * The first argument is the id of the msdyn_ocsession record to call it on.
 */
export class UpdateOptionalWrapUpAction implements Executable<UpdateOptionalWrapUpResponse> {
  constructor(
    public readonly msdyn_ocsessionId: string,
    public readonly parameters: UpdateOptionalWrapUpActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocsessions(${this.msdyn_ocsessionId})/Microsoft.Dynamics.CRM.UpdateOptionalWrapUp`;

    const body = requestBody({
      Payload: this.parameters.Payload,
      ApiVersion: this.parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<UpdateOptionalWrapUpResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as UpdateOptionalWrapUpResponse;
    return (await response.json()) as UpdateOptionalWrapUpResponse;
  }
}
