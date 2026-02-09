import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetEntityViews request message
 *
 * Web API Action: msdyn_GetEntityViews
 */
export class msdyn_GetEntityViewsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEntityViewsResponse>
{
  constructor(public msdyn_input: string) {
    super("msdyn_GetEntityViews");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityViews`;

    const body: Record<string, unknown> = {
      msdyn_input: this.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_GetEntityViewsResponse> {
    const data = await response.json();
    return msdyn_GetEntityViewsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_input: this.msdyn_input,
    };
  }
}

/**
 * msdyn_GetEntityViews response message
 */
export class msdyn_GetEntityViewsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetEntityViewsResponse) {
    super("msdyn_GetEntityViews");
  }

  static fromResponse(data: unknown): msdyn_GetEntityViewsResponse {
    return new msdyn_GetEntityViewsResponse((data as any).value);
  }
}
