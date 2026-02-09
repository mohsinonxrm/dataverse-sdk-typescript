import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DiscoverFabricWorkspaces action
 */
export interface DiscoverFabricWorkspacesResponse {
  fabricWorkspaces: string;
}

/**
 * DiscoverFabricWorkspaces action
 *
 * Unbound action
 */
export class DiscoverFabricWorkspacesAction implements Executable<DiscoverFabricWorkspacesResponse> {
  constructor(public readonly fabricEnvironment: string) {}

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
    return data as DiscoverFabricWorkspacesResponse;
  }
}
