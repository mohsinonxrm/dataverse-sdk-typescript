import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FetchFCSValue action
 */
export interface msdyn_FetchFCSValueResponse {
  Value: string;
}

/**
 * msdyn_FetchFCSValue action
 *
 * Unbound action
 */
export class msdyn_FetchFCSValueAction implements Executable<msdyn_FetchFCSValueResponse> {
  constructor(
    public readonly namespace: string,
    public readonly key: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchFCSValue`;

    const body: Record<string, unknown> = {
      Namespace: this.namespace,
      Key: this.key,
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

  async parseResponse(response: Response): Promise<msdyn_FetchFCSValueResponse> {
    const data = await response.json();
    return data as msdyn_FetchFCSValueResponse;
  }
}
