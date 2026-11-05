import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_JsonGetNumber action
 */
export interface msdyn_JsonGetNumberResponse {
  Value: number;
}

/**
 * msdyn_JsonGetNumber action
 *
 * Unbound action
 */
export class msdyn_JsonGetNumberAction implements Executable<msdyn_JsonGetNumberResponse> {
  constructor(
    public readonly json: string,
    public readonly propertyPath: string,
    public readonly defaultReturnValue: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetNumber`;

    const body: Record<string, unknown> = {
      Json: this.json,
      PropertyPath: this.propertyPath,
      DefaultReturnValue: this.defaultReturnValue,
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

  async parseResponse(response: Response): Promise<msdyn_JsonGetNumberResponse> {
    const data = await response.json();
    return data as msdyn_JsonGetNumberResponse;
  }
}
