import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_dataprovideroperations request message
 *
 * Web API Action: msdyn_dataprovideroperations
 */
export class msdyn_dataprovideroperationsRequest
  extends OrganizationRequest
  implements Executable<msdyn_dataprovideroperationsResponse>
{
  constructor(
    public msdyn_recordid: string,
    public msdyn_payload: string,
    public msdyn_httpmethod: string
  ) {
    super("msdyn_dataprovideroperations");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_dataprovideroperations`;

    const body: Record<string, unknown> = {
      msdyn_recordid: this.msdyn_recordid,
      msdyn_payload: this.msdyn_payload,
      msdyn_httpmethod: this.msdyn_httpmethod,
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

  async parseResponse(response: Response): Promise<msdyn_dataprovideroperationsResponse> {
    const data = await response.json();
    return msdyn_dataprovideroperationsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_recordid: this.msdyn_recordid,
      msdyn_payload: this.msdyn_payload,
      msdyn_httpmethod: this.msdyn_httpmethod,
    };
  }
}

/**
 * msdyn_dataprovideroperations response message
 */
export class msdyn_dataprovideroperationsResponse extends OrganizationResponse {
  constructor(public result: msdyn_dataprovideroperationsResponse) {
    super("msdyn_dataprovideroperations");
  }

  static fromResponse(data: unknown): msdyn_dataprovideroperationsResponse {
    return new msdyn_dataprovideroperationsResponse((data as any).value);
  }
}
