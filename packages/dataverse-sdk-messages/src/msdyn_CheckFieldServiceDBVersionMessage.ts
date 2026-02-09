import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckFieldServiceDBVersion request message
 *
 * Web API Action: msdyn_CheckFieldServiceDBVersion
 */
export class msdyn_CheckFieldServiceDBVersionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckFieldServiceDBVersionResponse>
{
  constructor(public expectedDBVersion: string) {
    super("msdyn_CheckFieldServiceDBVersion");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckFieldServiceDBVersion`;

    const body: Record<string, unknown> = {
      ExpectedDBVersion: this.expectedDBVersion,
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

  async parseResponse(response: Response): Promise<msdyn_CheckFieldServiceDBVersionResponse> {
    const data = await response.json();
    return msdyn_CheckFieldServiceDBVersionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ExpectedDBVersion: this.expectedDBVersion,
    };
  }
}

/**
 * msdyn_CheckFieldServiceDBVersion response message
 */
export class msdyn_CheckFieldServiceDBVersionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckFieldServiceDBVersionResponse) {
    super("msdyn_CheckFieldServiceDBVersion");
  }

  static fromResponse(data: unknown): msdyn_CheckFieldServiceDBVersionResponse {
    return new msdyn_CheckFieldServiceDBVersionResponse((data as any).value);
  }
}
