import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_InitiateCCaaSAPIsAsyncResponse as msdyn_InitiateCCaaSAPIsAsyncResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_InitiateCCaaSAPIsAsync message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InitiateCCaaSAPIsAsyncRequestParameters {
  CCaaSAPI: string;
  LiveWorkItemId: string;
  InitiatingUser: string;
  Payload: string;
}

/**
 * msdyn_InitiateCCaaSAPIsAsync request message
 *
 * Web API Action: msdyn_InitiateCCaaSAPIsAsync
 */
export class msdyn_InitiateCCaaSAPIsAsyncRequest
  extends OrganizationRequest
  implements Executable<msdyn_InitiateCCaaSAPIsAsyncResponse>
{
  declare readonly Parameters: Readonly<msdyn_InitiateCCaaSAPIsAsyncRequestParameters>;

  constructor(parameters: msdyn_InitiateCCaaSAPIsAsyncRequestParameters) {
    super("msdyn_InitiateCCaaSAPIsAsync", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitiateCCaaSAPIsAsync`;

    const body = requestBody({
      CCaaSAPI: this.Parameters.CCaaSAPI,
      LiveWorkItemId: this.Parameters.LiveWorkItemId,
      InitiatingUser: this.Parameters.InitiatingUser,
      Payload: this.Parameters.Payload,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_InitiateCCaaSAPIsAsyncResponse.fromResponse({});
    return msdyn_InitiateCCaaSAPIsAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_InitiateCCaaSAPIsAsync response message
 */
export class msdyn_InitiateCCaaSAPIsAsyncResponse extends OrganizationResponse {
  constructor(public result: msdyn_InitiateCCaaSAPIsAsyncResponseData) {
    super("msdyn_InitiateCCaaSAPIsAsync");
  }

  static fromResponse(data: unknown): msdyn_InitiateCCaaSAPIsAsyncResponse {
    return new msdyn_InitiateCCaaSAPIsAsyncResponse(
      responseObject<msdyn_InitiateCCaaSAPIsAsyncResponseData>(data)
    );
  }
}
