import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RetrieveEnvironmentVariableValueForCS action
 */
export interface msdyn_RetrieveEnvironmentVariableValueForCSResponse {
  msdyn_EnvironmentVariableValue: string;
}

/**
 * Parameters of the msdyn_RetrieveEnvironmentVariableValueForCS action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveEnvironmentVariableValueForCSActionParameters {
  msdyn_EnvironmentVariableName: string;
}

/**
 * msdyn_RetrieveEnvironmentVariableValueForCS action
 *
 * Unbound action
 */
export class msdyn_RetrieveEnvironmentVariableValueForCSAction implements Executable<msdyn_RetrieveEnvironmentVariableValueForCSResponse> {
  constructor(
    public readonly parameters: msdyn_RetrieveEnvironmentVariableValueForCSActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveEnvironmentVariableValueForCS`;

    const body = requestBody({
      msdyn_EnvironmentVariableName: this.parameters.msdyn_EnvironmentVariableName,
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
  ): Promise<msdyn_RetrieveEnvironmentVariableValueForCSResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RetrieveEnvironmentVariableValueForCSResponse;
    return (await response.json()) as msdyn_RetrieveEnvironmentVariableValueForCSResponse;
  }
}
