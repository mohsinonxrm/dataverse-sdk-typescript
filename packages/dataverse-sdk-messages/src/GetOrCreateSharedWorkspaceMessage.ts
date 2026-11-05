import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { sharedworkspace } from "./types/index.js";

/**
 * GetOrCreateSharedWorkspace request message
 *
 * Web API Action: GetOrCreateSharedWorkspace
 */
export class GetOrCreateSharedWorkspaceRequest
  extends OrganizationRequest
  implements Executable<GetOrCreateSharedWorkspaceResponse>
{
  constructor(
    public customclaims: EntityReference,
    public target: sharedworkspace
  ) {
    super("GetOrCreateSharedWorkspace");
  }

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
    return GetOrCreateSharedWorkspaceResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      customclaims: this.customclaims,
      target: this.target,
    };
  }
}

/**
 * GetOrCreateSharedWorkspace response message
 */
export class GetOrCreateSharedWorkspaceResponse extends OrganizationResponse {
  constructor(public result: sharedworkspace) {
    super("GetOrCreateSharedWorkspace");
  }

  static fromResponse(data: unknown): GetOrCreateSharedWorkspaceResponse {
    return new GetOrCreateSharedWorkspaceResponse((data as any).value);
  }
}
