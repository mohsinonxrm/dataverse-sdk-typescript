import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FSDemoDataRequest request message
 *
 * Web API Action: msdyn_FSDemoDataRequest
 */
export class msdyn_FSDemoDataRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_FSDemoDataRequestResponse>
{
  constructor(public operation: string) {
    super("msdyn_FSDemoDataRequest");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FSDemoDataRequest`;

    const body: Record<string, unknown> = {
      Operation: this.operation,
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

  async parseResponse(response: Response): Promise<msdyn_FSDemoDataRequestResponse> {
    const data = await response.json();
    return msdyn_FSDemoDataRequestResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Operation: this.operation,
    };
  }
}

/**
 * msdyn_FSDemoDataRequest response message
 */
export class msdyn_FSDemoDataRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_FSDemoDataRequestResponse) {
    super("msdyn_FSDemoDataRequest");
  }

  static fromResponse(data: unknown): msdyn_FSDemoDataRequestResponse {
    return new msdyn_FSDemoDataRequestResponse((data as any).value);
  }
}
