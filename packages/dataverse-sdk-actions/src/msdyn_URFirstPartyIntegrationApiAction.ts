import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_URFirstPartyIntegrationApi action
 */
export interface msdyn_URFirstPartyIntegrationApiResponse {
  Result: string;
}

/**
 * msdyn_URFirstPartyIntegrationApi action
 *
 * Unbound action
 */
export class msdyn_URFirstPartyIntegrationApiAction implements Executable<msdyn_URFirstPartyIntegrationApiResponse> {
  constructor(
    public readonly methodName: string,
    public readonly inputParameter?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_URFirstPartyIntegrationApi`;

    const body: Record<string, unknown> = {
      MethodName: this.methodName,
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

  async parseResponse(response: Response): Promise<msdyn_URFirstPartyIntegrationApiResponse> {
    const data = await response.json();
    return data as msdyn_URFirstPartyIntegrationApiResponse;
  }
}
