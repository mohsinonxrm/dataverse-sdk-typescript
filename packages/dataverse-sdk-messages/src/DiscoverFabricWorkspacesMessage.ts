import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * DiscoverFabricWorkspaces request message
 *
 * Web API Action: DiscoverFabricWorkspaces
 */
export class DiscoverFabricWorkspacesRequest
  extends OrganizationRequest
  implements Executable<DiscoverFabricWorkspacesResponse>
{
  constructor(public fabricEnvironment: string) {
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<DiscoverFabricWorkspacesResponse> {
    const data = await response.json();
    return DiscoverFabricWorkspacesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      fabricEnvironment: this.fabricEnvironment,
    };
  }
}

/**
 * DiscoverFabricWorkspaces response message
 */
export class DiscoverFabricWorkspacesResponse extends OrganizationResponse {
  constructor(public result: DiscoverFabricWorkspacesResponse) {
    super("DiscoverFabricWorkspaces");
  }

  static fromResponse(data: unknown): DiscoverFabricWorkspacesResponse {
    return new DiscoverFabricWorkspacesResponse((data as any).value);
  }
}
