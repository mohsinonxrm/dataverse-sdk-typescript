import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { sharedworkspace } from "./types/index.js";

/**
 * Response from GetOrCreateSharedWorkspace action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface GetOrCreateSharedWorkspaceResponse extends sharedworkspace {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * GetOrCreateSharedWorkspace action
 *
 * Unbound action
 */
export class GetOrCreateSharedWorkspaceAction implements Executable<GetOrCreateSharedWorkspaceResponse> {
  constructor(
    public readonly customclaims: EntityReference,
    public readonly target: sharedworkspace
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetOrCreateSharedWorkspace`;

    const body: Record<string, unknown> = {
      customclaims: this.customclaims,
      target: this.target,
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

  async parseResponse(response: Response): Promise<GetOrCreateSharedWorkspaceResponse> {
    const data = await response.json();
    return data as GetOrCreateSharedWorkspaceResponse;
  }
}
