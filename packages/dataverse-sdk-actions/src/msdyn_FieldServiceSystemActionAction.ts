import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FieldServiceSystemAction action
 */
export interface msdyn_FieldServiceSystemActionResponse {
  OutputParameter: string;
}

/**
 * msdyn_FieldServiceSystemAction action
 *
 * Unbound action
 */
export class msdyn_FieldServiceSystemActionAction implements Executable<msdyn_FieldServiceSystemActionResponse> {
  constructor(
    public readonly type: number,
    public readonly inputParameter: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FieldServiceSystemAction`;

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

  async parseResponse(response: Response): Promise<msdyn_FieldServiceSystemActionResponse> {
    const data = await response.json();
    return data as msdyn_FieldServiceSystemActionResponse;
  }
}
