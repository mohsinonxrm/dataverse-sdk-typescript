import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ExecuteSISampleDataRequest request message
 *
 * Web API Action: msdyn_ExecuteSISampleDataRequest
 */
export class msdyn_ExecuteSISampleDataRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteSISampleDataRequestResponse>
{
  constructor(
    public operation: string,
    public version: string,
    public lcid: string
  ) {
    super("msdyn_ExecuteSISampleDataRequest");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteSISampleDataRequest`;

    const body: Record<string, unknown> = {
      Operation: this.operation,
      Version: this.version,
      Lcid: this.lcid,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteSISampleDataRequestResponse> {
    const data = await response.json();
    return msdyn_ExecuteSISampleDataRequestResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Operation: this.operation,
      Version: this.version,
      Lcid: this.lcid,
    };
  }
}

/**
 * msdyn_ExecuteSISampleDataRequest response message
 */
export class msdyn_ExecuteSISampleDataRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteSISampleDataRequestResponse) {
    super("msdyn_ExecuteSISampleDataRequest");
  }

  static fromResponse(data: unknown): msdyn_ExecuteSISampleDataRequestResponse {
    return new msdyn_ExecuteSISampleDataRequestResponse((data as any).value);
  }
}
