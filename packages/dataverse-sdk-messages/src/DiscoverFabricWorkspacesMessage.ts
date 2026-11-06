import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { DiscoverFabricWorkspacesResponse as DiscoverFabricWorkspacesResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return DiscoverFabricWorkspacesResponse.fromResponse({});
    return DiscoverFabricWorkspacesResponse.fromResponse(await response.json());
  }
}

/**
 * DiscoverFabricWorkspaces response message
 */
export class DiscoverFabricWorkspacesResponse extends OrganizationResponse {
  constructor(public result: DiscoverFabricWorkspacesResponseData) {
    super("DiscoverFabricWorkspaces");
  }

  static fromResponse(data: unknown): DiscoverFabricWorkspacesResponse {
    return new DiscoverFabricWorkspacesResponse(
      responseObject<DiscoverFabricWorkspacesResponseData>(data)
    );
  }
}
