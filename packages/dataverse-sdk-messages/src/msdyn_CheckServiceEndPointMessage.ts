import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckServiceEndPoint request message
 *
 * Web API Action: msdyn_CheckServiceEndPoint
 */
export class msdyn_CheckServiceEndPointRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckServiceEndPointResponse>
{
  constructor() {
    super("msdyn_CheckServiceEndPoint");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckServiceEndPoint`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckServiceEndPointResponse> {
    const data = await response.json();
    return msdyn_CheckServiceEndPointResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckServiceEndPoint response message
 */
export class msdyn_CheckServiceEndPointResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckServiceEndPointResponse) {
    super("msdyn_CheckServiceEndPoint");
  }

  static fromResponse(data: unknown): msdyn_CheckServiceEndPointResponse {
    return new msdyn_CheckServiceEndPointResponse((data as any).value);
  }
}
