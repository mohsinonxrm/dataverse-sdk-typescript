import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { sharedworkspace } from "./types/index.js";

/**
 * Parameters of the GetOrCreateSharedWorkspace message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetOrCreateSharedWorkspaceRequestParameters {
  target: EntityReference | EntityPayload<sharedworkspace>;
  customclaims?: EntityReference | AnyEntityPayload;
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
      target: this.Parameters.target,
      customclaims: this.Parameters.customclaims,
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
    if (response.status === 204) return GetOrCreateSharedWorkspaceResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return GetOrCreateSharedWorkspaceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetOrCreateSharedWorkspace action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GetOrCreateSharedWorkspaceResult =
  | (sharedworkspace & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * GetOrCreateSharedWorkspace response message
 *
 * `result` is the value the GetOrCreateSharedWorkspace action returns (see {@link GetOrCreateSharedWorkspaceResult}).
 */
export class GetOrCreateSharedWorkspaceResponse extends OrganizationResponse {
  constructor(public result: GetOrCreateSharedWorkspaceResult) {
    super("GetOrCreateSharedWorkspace");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetOrCreateSharedWorkspaceResponse {
    return new GetOrCreateSharedWorkspaceResponse(
      (data ?? null) as GetOrCreateSharedWorkspaceResult
    );
  }
}
