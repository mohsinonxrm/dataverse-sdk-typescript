import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckForWorkOrderTypes request message
 *
 * Web API Action: msdyn_CheckForWorkOrderTypes
 */
export class msdyn_CheckForWorkOrderTypesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForWorkOrderTypesResponse>
{
  constructor() {
    super("msdyn_CheckForWorkOrderTypes");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForWorkOrderTypes`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForWorkOrderTypesResponse> {
    const data = await response.json();
    return msdyn_CheckForWorkOrderTypesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckForWorkOrderTypes response message
 */
export class msdyn_CheckForWorkOrderTypesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForWorkOrderTypesResponse) {
    super("msdyn_CheckForWorkOrderTypes");
  }

  static fromResponse(data: unknown): msdyn_CheckForWorkOrderTypesResponse {
    return new msdyn_CheckForWorkOrderTypesResponse((data as any).value);
  }
}
