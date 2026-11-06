import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetBookableResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetBookableResourcesRequestParameters {
  Resources: string;
}

/**
 * msdyn_GetBookableResources request message
 *
 * Web API Action: msdyn_GetBookableResources
 */
export class msdyn_GetBookableResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetBookableResourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetBookableResourcesRequestParameters>;

  constructor(parameters: msdyn_GetBookableResourcesRequestParameters) {
    super("msdyn_GetBookableResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBookableResources`;

    const body = requestBody({
      Resources: this.Parameters.Resources,
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

  async parseResponse(response: Response): Promise<msdyn_GetBookableResourcesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetBookableResourcesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetBookableResources action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetBookableResourcesResult {
  "@odata.context"?: string;
  BookableResources: string;
}

/**
 * msdyn_GetBookableResources response message
 *
 * `result` is the value the msdyn_GetBookableResources action returns (see {@link msdyn_GetBookableResourcesResult}).
 */
export class msdyn_GetBookableResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetBookableResourcesResult) {
    super("msdyn_GetBookableResources");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetBookableResourcesResponse {
    return new msdyn_GetBookableResourcesResponse(data as msdyn_GetBookableResourcesResult);
  }
}
