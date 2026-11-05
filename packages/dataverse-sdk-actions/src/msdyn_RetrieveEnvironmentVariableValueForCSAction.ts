import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrieveEnvironmentVariableValueForCS action
 */
export interface msdyn_RetrieveEnvironmentVariableValueForCSResponse {
  msdyn_EnvironmentVariableValue: string;
}

/**
 * msdyn_RetrieveEnvironmentVariableValueForCS action
 *
 * Unbound action
 */
export class msdyn_RetrieveEnvironmentVariableValueForCSAction implements Executable<msdyn_RetrieveEnvironmentVariableValueForCSResponse> {
  constructor(public readonly msdyn_EnvironmentVariableName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveEnvironmentVariableValueForCS`;

    const body: Record<string, unknown> = {
      msdyn_EnvironmentVariableName: this.msdyn_EnvironmentVariableName,
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
  ): Promise<msdyn_RetrieveEnvironmentVariableValueForCSResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveEnvironmentVariableValueForCSResponse;
  }
}
