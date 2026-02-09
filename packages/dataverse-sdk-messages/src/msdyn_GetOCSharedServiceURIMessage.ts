import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetOCSharedServiceURI request message
 *
 * Web API Action: msdyn_GetOCSharedServiceURI
 */
export class msdyn_GetOCSharedServiceURIRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOCSharedServiceURIResponse>
{
  constructor() {
    super("msdyn_GetOCSharedServiceURI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOCSharedServiceURI`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetOCSharedServiceURIResponse> {
    const data = await response.json();
    return msdyn_GetOCSharedServiceURIResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetOCSharedServiceURI response message
 */
export class msdyn_GetOCSharedServiceURIResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOCSharedServiceURIResponse) {
    super("msdyn_GetOCSharedServiceURI");
  }

  static fromResponse(data: unknown): msdyn_GetOCSharedServiceURIResponse {
    return new msdyn_GetOCSharedServiceURIResponse((data as any).value);
  }
}
