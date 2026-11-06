import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_InitiateCCaaSAPIsAsyncResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_InitiateCCaaSAPIsAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InitiateCCaaSAPIsAsyncResult {
  "@odata.context"?: string;
  msdyn_InitiateCCaaSAPIsAsyncResponse: string;
}

/**
 * msdyn_InitiateCCaaSAPIsAsync response message
 *
 * `result` is the value the msdyn_InitiateCCaaSAPIsAsync action returns (see {@link msdyn_InitiateCCaaSAPIsAsyncResult}).
 */
export class msdyn_InitiateCCaaSAPIsAsyncResponse extends OrganizationResponse {
  constructor(public result: msdyn_InitiateCCaaSAPIsAsyncResult) {
    super("msdyn_InitiateCCaaSAPIsAsync");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_InitiateCCaaSAPIsAsyncResponse {
    return new msdyn_InitiateCCaaSAPIsAsyncResponse(data as msdyn_InitiateCCaaSAPIsAsyncResult);
  }
}
