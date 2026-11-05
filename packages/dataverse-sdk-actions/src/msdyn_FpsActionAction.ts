import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FpsAction action
 */
export interface msdyn_FpsActionResponse {
  OutputParameter: string;
}

/**
 * msdyn_FpsAction action
 *
 * Unbound action
 */
export class msdyn_FpsActionAction implements Executable<msdyn_FpsActionResponse> {
  constructor(
    public readonly type: number,
    public readonly inputParameter: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FpsAction`;

    const body: Record<string, unknown> = {
      Type: this.type,
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

  async parseResponse(response: Response): Promise<msdyn_FpsActionResponse> {
    const data = await response.json();
    return data as msdyn_FpsActionResponse;
  }
}
