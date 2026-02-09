import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetFCSValue action
 */
export interface msdyn_GetFCSValueResponse {
  Value: boolean;
}

/**
 * msdyn_GetFCSValue action
 *
 * Unbound action
 */
export class msdyn_GetFCSValueAction implements Executable<msdyn_GetFCSValueResponse> {
  constructor(
    public readonly key: string,
    public readonly namespace: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFCSValue`;

    const body: Record<string, unknown> = {
      Key: this.key,
      Namespace: this.namespace,
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

  async parseResponse(response: Response): Promise<msdyn_GetFCSValueResponse> {
    const data = await response.json();
    return data as msdyn_GetFCSValueResponse;
  }
}
