import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetOrCreateBookableResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOrCreateBookableResourcesRequestParameters {
  Resources: string;
}

/**
 * msdyn_GetOrCreateBookableResources request message
 *
 * Web API Action: msdyn_GetOrCreateBookableResources
 */
export class msdyn_GetOrCreateBookableResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOrCreateBookableResourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetOrCreateBookableResourcesRequestParameters>;

  constructor(parameters: msdyn_GetOrCreateBookableResourcesRequestParameters) {
    super("msdyn_GetOrCreateBookableResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrCreateBookableResources`;

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

  async parseResponse(response: Response): Promise<msdyn_GetOrCreateBookableResourcesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetOrCreateBookableResourcesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetOrCreateBookableResources action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOrCreateBookableResourcesResult {
  "@odata.context"?: string;
  BookableResources: string;
}

/**
 * msdyn_GetOrCreateBookableResources response message
 *
 * `result` is the value the msdyn_GetOrCreateBookableResources action returns (see {@link msdyn_GetOrCreateBookableResourcesResult}).
 */
export class msdyn_GetOrCreateBookableResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrCreateBookableResourcesResult) {
    super("msdyn_GetOrCreateBookableResources");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetOrCreateBookableResourcesResponse {
    return new msdyn_GetOrCreateBookableResourcesResponse(
      data as msdyn_GetOrCreateBookableResourcesResult
    );
  }
}
