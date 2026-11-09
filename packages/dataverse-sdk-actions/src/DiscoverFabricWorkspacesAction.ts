import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the DiscoverFabricWorkspaces action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DiscoverFabricWorkspacesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as DiscoverFabricWorkspacesResponse;
  }
}
