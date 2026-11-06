import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { sharedworkspace } from "./types/index.js";

/**
 * Parameters of the GetOrCreateSharedWorkspace message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetOrCreateSharedWorkspaceRequestParameters {
  customclaims?: EntityReference | AnyEntityPayload;
  target: EntityReference | EntityPayload<sharedworkspace>;
}

/**
 * GetOrCreateSharedWorkspace request message
 *
 * Web API Action: GetOrCreateSharedWorkspace
 */
export class GetOrCreateSharedWorkspaceRequest
  extends OrganizationRequest
  implements Executable<GetOrCreateSharedWorkspaceResponse>
{
  declare readonly Parameters: Readonly<GetOrCreateSharedWorkspaceRequestParameters>;

  constructor(parameters: GetOrCreateSharedWorkspaceRequestParameters) {
    super("GetOrCreateSharedWorkspace", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetOrCreateSharedWorkspace`;

    const body = requestBody({
      customclaims: this.Parameters.customclaims,
      target: this.Parameters.target,
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

  async parseResponse(response: Response): Promise<GetOrCreateSharedWorkspaceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return GetOrCreateSharedWorkspaceResponse.fromResponse({});
    return GetOrCreateSharedWorkspaceResponse.fromResponse(await response.json());
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
    return new GetOrCreateSharedWorkspaceResponse(responseObject<sharedworkspace>(data));
  }
}
