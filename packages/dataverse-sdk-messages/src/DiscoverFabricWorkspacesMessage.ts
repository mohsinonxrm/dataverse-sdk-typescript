import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { DiscoverFabricWorkspacesResponse as DiscoverFabricWorkspacesResponseData } from "./types/index.js";

/**
 * DiscoverFabricWorkspaces request message
 *
 * Web API Action: DiscoverFabricWorkspaces
 */
export class DiscoverFabricWorkspacesRequest
  extends OrganizationRequest
  implements Executable<DiscoverFabricWorkspacesResponse>
{
  constructor(public fabricEnvironment?: string) {
    super("DiscoverFabricWorkspaces");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DiscoverFabricWorkspaces`;

    const body: Record<string, unknown> = {
      fabricEnvironment: this.fabricEnvironment,
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

  async parseResponse(response: Response): Promise<DiscoverFabricWorkspacesResponse> {
    const data = await response.json();
    return DiscoverFabricWorkspacesResponse.fromResponse(data);
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
