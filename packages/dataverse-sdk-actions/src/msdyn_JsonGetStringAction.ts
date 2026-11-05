import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_JsonGetString action
 */
export interface msdyn_JsonGetStringResponse {
  Value: string;
}

/**
 * msdyn_JsonGetString action
 *
 * Unbound action
 */
export class msdyn_JsonGetStringAction implements Executable<msdyn_JsonGetStringResponse> {
  constructor(
    public readonly json: string,
    public readonly propertyPath: string,
    public readonly defaultReturnValue: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetString`;

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

  async parseResponse(response: Response): Promise<msdyn_JsonGetStringResponse> {
    const data = await response.json();
    return data as msdyn_JsonGetStringResponse;
  }
}
