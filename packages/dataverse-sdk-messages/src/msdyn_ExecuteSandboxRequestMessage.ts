import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ExecuteSandboxRequest request message
 *
 * Web API Action: msdyn_ExecuteSandboxRequest
 */
export class msdyn_ExecuteSandboxRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteSandboxRequestResponse>
{
  constructor(
    public methodName: string,
    public methodParams: string
  ) {
    super("msdyn_ExecuteSandboxRequest");
  }

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
    return msdyn_ExecuteSandboxRequestResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      MethodName: this.methodName,
      MethodParams: this.methodParams,
    };
  }
}

/**
 * msdyn_ExecuteSandboxRequest response message
 */
export class msdyn_ExecuteSandboxRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteSandboxRequestResponse) {
    super("msdyn_ExecuteSandboxRequest");
  }

  static fromResponse(data: unknown): msdyn_ExecuteSandboxRequestResponse {
    return new msdyn_ExecuteSandboxRequestResponse((data as any).value);
  }
}
