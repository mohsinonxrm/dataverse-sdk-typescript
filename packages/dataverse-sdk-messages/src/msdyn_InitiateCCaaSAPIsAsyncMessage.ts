import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_InitiateCCaaSAPIsAsync request message
 *
 * Web API Action: msdyn_InitiateCCaaSAPIsAsync
 */
export class msdyn_InitiateCCaaSAPIsAsyncRequest
  extends OrganizationRequest
  implements Executable<msdyn_InitiateCCaaSAPIsAsyncResponse>
{
  constructor(
    public payload: string,
    public liveWorkItemId: string,
    public cCaaSAPI: string,
    public initiatingUser: string
  ) {
    super("msdyn_InitiateCCaaSAPIsAsync");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitiateCCaaSAPIsAsync`;

    const body: Record<string, unknown> = {
      Payload: this.payload,
      LiveWorkItemId: this.liveWorkItemId,
      CCaaSAPI: this.cCaaSAPI,
      InitiatingUser: this.initiatingUser,
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

  async parseResponse(response: Response): Promise<msdyn_InitiateCCaaSAPIsAsyncResponse> {
    const data = await response.json();
    return msdyn_InitiateCCaaSAPIsAsyncResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Payload: this.payload,
      LiveWorkItemId: this.liveWorkItemId,
      CCaaSAPI: this.cCaaSAPI,
      InitiatingUser: this.initiatingUser,
    };
  }
}

/**
 * msdyn_InitiateCCaaSAPIsAsync response message
 */
export class msdyn_InitiateCCaaSAPIsAsyncResponse extends OrganizationResponse {
  constructor(public result: msdyn_InitiateCCaaSAPIsAsyncResponse) {
    super("msdyn_InitiateCCaaSAPIsAsync");
  }

  static fromResponse(data: unknown): msdyn_InitiateCCaaSAPIsAsyncResponse {
    return new msdyn_InitiateCCaaSAPIsAsyncResponse((data as any).value);
  }
}
