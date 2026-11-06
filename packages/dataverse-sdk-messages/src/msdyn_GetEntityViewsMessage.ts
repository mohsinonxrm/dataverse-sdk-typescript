import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetEntityViews message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEntityViewsRequestParameters {
  msdyn_input: string;
}

/**
 * msdyn_GetEntityViews request message
 *
 * Web API Action: msdyn_GetEntityViews
 */
export class msdyn_GetEntityViewsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEntityViewsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetEntityViewsRequestParameters>;

  constructor(parameters: msdyn_GetEntityViewsRequestParameters) {
    super("msdyn_GetEntityViews", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityViews`;

    const body = requestBody({
      msdyn_input: this.Parameters.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_GetEntityViewsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetEntityViewsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetEntityViews action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetEntityViewsResult {
  "@odata.context"?: string;
  msdyn_output: string;
}

/**
 * msdyn_GetEntityViews response message
 *
 * `result` is the value the msdyn_GetEntityViews action returns (see {@link msdyn_GetEntityViewsResult}).
 */
export class msdyn_GetEntityViewsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetEntityViewsResult) {
    super("msdyn_GetEntityViews");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetEntityViewsResponse {
    return new msdyn_GetEntityViewsResponse(data as msdyn_GetEntityViewsResult);
  }
}
