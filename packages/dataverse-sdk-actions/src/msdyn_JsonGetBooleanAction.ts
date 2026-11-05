import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_JsonGetBoolean action
 */
export interface msdyn_JsonGetBooleanResponse {
  Value: boolean;
}

/**
 * msdyn_JsonGetBoolean action
 *
 * Unbound action
 */
export class msdyn_JsonGetBooleanAction implements Executable<msdyn_JsonGetBooleanResponse> {
  constructor(
    public readonly json: string,
    public readonly propertyPath: string,
    public readonly defaultReturnValue: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetBoolean`;

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

  async parseResponse(response: Response): Promise<msdyn_JsonGetBooleanResponse> {
    const data = await response.json();
    return data as msdyn_JsonGetBooleanResponse;
  }
}
