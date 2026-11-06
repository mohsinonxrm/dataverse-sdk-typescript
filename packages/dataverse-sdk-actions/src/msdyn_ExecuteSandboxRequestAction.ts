import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ExecuteSandboxRequest action
 */
export interface msdyn_ExecuteSandboxRequestResponse {
  Response: string;
}

/**
 * msdyn_ExecuteSandboxRequest action
 *
 * Unbound action
 */
export class msdyn_ExecuteSandboxRequestAction implements Executable<msdyn_ExecuteSandboxRequestResponse> {
  constructor(
    public readonly methodName: string,
    public readonly methodParams?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteSandboxRequest`;

    const body: Record<string, unknown> = {
      MethodName: this.methodName,
      MethodParams: this.methodParams,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteSandboxRequestResponse> {
    const data = await response.json();
    return data as msdyn_ExecuteSandboxRequestResponse;
  }
}
