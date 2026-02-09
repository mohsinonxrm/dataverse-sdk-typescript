import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetBoolFCSValue action
 */
export interface msdyn_GetBoolFCSValueResponse {
  msdyn_BoolFCSValue: string;
}

/**
 * msdyn_GetBoolFCSValue action
 *
 * Unbound action
 */
export class msdyn_GetBoolFCSValueAction implements Executable<msdyn_GetBoolFCSValueResponse> {
  constructor(
    public readonly msdyn_BoolFCSKey: string,
    public readonly msdyn_BoolFCSNamespace: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBoolFCSValue`;

    const body: Record<string, unknown> = {
      msdyn_BoolFCSKey: this.msdyn_BoolFCSKey,
      msdyn_BoolFCSNamespace: this.msdyn_BoolFCSNamespace,
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

  async parseResponse(response: Response): Promise<msdyn_GetBoolFCSValueResponse> {
    const data = await response.json();
    return data as msdyn_GetBoolFCSValueResponse;
  }
}
