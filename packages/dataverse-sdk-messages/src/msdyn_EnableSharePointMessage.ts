import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_EnableSharePoint request message
 *
 * Web API Action: msdyn_EnableSharePoint
 */
export class msdyn_EnableSharePointRequest
  extends OrganizationRequest
  implements Executable<msdyn_EnableSharePointResponse>
{
  constructor() {
    super("msdyn_EnableSharePoint");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableSharePoint`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_EnableSharePointResponse> {
    const data = await response.json();
    return msdyn_EnableSharePointResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_EnableSharePoint response message
 */
export class msdyn_EnableSharePointResponse extends OrganizationResponse {
  constructor(public result: msdyn_EnableSharePointResponse) {
    super("msdyn_EnableSharePoint");
  }

  static fromResponse(data: unknown): msdyn_EnableSharePointResponse {
    return new msdyn_EnableSharePointResponse((data as any).value);
  }
}
