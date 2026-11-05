import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetAutoCaptureUri request message
 *
 * Web API Action: msdyn_GetAutoCaptureUri
 */
export class msdyn_GetAutoCaptureUriRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAutoCaptureUriResponse>
{
  constructor(public uriType: string) {
    super("msdyn_GetAutoCaptureUri");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAutoCaptureUri`;

    const body: Record<string, unknown> = {
      uriType: this.uriType,
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

  async parseResponse(response: Response): Promise<msdyn_GetAutoCaptureUriResponse> {
    const data = await response.json();
    return msdyn_GetAutoCaptureUriResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      uriType: this.uriType,
    };
  }
}

/**
 * msdyn_GetAutoCaptureUri response message
 */
export class msdyn_GetAutoCaptureUriResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAutoCaptureUriResponse) {
    super("msdyn_GetAutoCaptureUri");
  }

  static fromResponse(data: unknown): msdyn_GetAutoCaptureUriResponse {
    return new msdyn_GetAutoCaptureUriResponse((data as any).value);
  }
}
