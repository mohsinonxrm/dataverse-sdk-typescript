import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { sharedworkspace } from "./types/index.js";

/**
 * Response from the GetOrCreateSharedWorkspace action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GetOrCreateSharedWorkspaceResponse =
  | (sharedworkspace & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as GetOrCreateSharedWorkspaceResponse;
  }
}
