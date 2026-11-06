import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UpdateOptionalWrapUp action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UpdateOptionalWrapUpResponse = void;

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

  parseResponse(_response: Response): Promise<UpdateOptionalWrapUpResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
