import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DiscoverFabricWorkspaces action
 */
export interface DiscoverFabricWorkspacesResponse {
  fabricWorkspaces: string;
}

/**
 * Parameters of the DiscoverFabricWorkspaces action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DiscoverFabricWorkspacesActionParameters {
  fabricEnvironment?: string;
}

/**
 * DiscoverFabricWorkspaces action
 *
 * Unbound action
 */
export class DiscoverFabricWorkspacesAction implements Executable<DiscoverFabricWorkspacesResponse> {
  constructor(public readonly parameters: DiscoverFabricWorkspacesActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DiscoverFabricWorkspaces`;

    const body = requestBody({
      fabricEnvironment: this.parameters.fabricEnvironment,
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
    if (response.status === 204) return {} as DiscoverFabricWorkspacesResponse;
    return (await response.json()) as DiscoverFabricWorkspacesResponse;
  }
}
