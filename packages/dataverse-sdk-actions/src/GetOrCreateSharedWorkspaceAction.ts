import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
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
 * Parameters of the GetOrCreateSharedWorkspace action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetOrCreateSharedWorkspaceActionParameters {
  target: EntityReference | EntityPayload<sharedworkspace>;
  customclaims?: EntityReference | AnyEntityPayload;
}

/**
 * GetOrCreateSharedWorkspace action
 *
 * Unbound action
 */
export class GetOrCreateSharedWorkspaceAction implements Executable<GetOrCreateSharedWorkspaceResponse> {
  constructor(public readonly parameters: GetOrCreateSharedWorkspaceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetOrCreateSharedWorkspace`;

    const body = requestBody({
      target: this.parameters.target,
      customclaims: this.parameters.customclaims,
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
    if (response.status === 204) return {} as GetOrCreateSharedWorkspaceResponse;
    return (await response.json()) as GetOrCreateSharedWorkspaceResponse;
  }
}
