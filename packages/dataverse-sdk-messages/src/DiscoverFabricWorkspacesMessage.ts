import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DiscoverFabricWorkspaces message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DiscoverFabricWorkspacesRequestParameters {
  fabricEnvironment?: string;
}

/**
 * DiscoverFabricWorkspaces request message
 *
 * Web API Action: DiscoverFabricWorkspaces
 */
export class DiscoverFabricWorkspacesRequest
  extends OrganizationRequest
  implements Executable<DiscoverFabricWorkspacesResponse>
{
  declare readonly Parameters: Readonly<DiscoverFabricWorkspacesRequestParameters>;

  constructor(parameters: DiscoverFabricWorkspacesRequestParameters = {}) {
    super("DiscoverFabricWorkspaces", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DiscoverFabricWorkspaces`;

    const body = requestBody({
      fabricEnvironment: this.Parameters.fabricEnvironment,
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

  async parseResponse(response: Response): Promise<DiscoverFabricWorkspacesResponse> {
    // The body is the complex value, with its @odata.context
    return DiscoverFabricWorkspacesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DiscoverFabricWorkspaces action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DiscoverFabricWorkspacesResult {
  "@odata.context"?: string;
  fabricWorkspaces: string;
}

/**
 * DiscoverFabricWorkspaces response message
 *
 * `result` is the value the DiscoverFabricWorkspaces action returns (see {@link DiscoverFabricWorkspacesResult}).
 */
export class DiscoverFabricWorkspacesResponse extends OrganizationResponse {
  constructor(public result: DiscoverFabricWorkspacesResult) {
    super("DiscoverFabricWorkspaces");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DiscoverFabricWorkspacesResponse {
    return new DiscoverFabricWorkspacesResponse(data as DiscoverFabricWorkspacesResult);
  }
}
