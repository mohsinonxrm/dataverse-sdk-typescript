import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { AccessRights } from "./types/index.js";

/**
 * Response from RevokeSharedLink action
 */
export interface RevokeSharedLinkResponse {
  // No content returned
}

/**
 * Parameters of the RevokeSharedLink action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RevokeSharedLinkActionParameters {
  Target: EntityReference | AnyEntityPayload;
  SharedRights: AccessRights;
}

/**
 * RevokeSharedLink action
 *
 * Unbound action
 */
export class RevokeSharedLinkAction implements Executable<RevokeSharedLinkResponse> {
  constructor(public readonly parameters: RevokeSharedLinkActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RevokeSharedLink`;

    const body = requestBody({
      Target: this.parameters.Target,
      SharedRights: enumBody(this.parameters.SharedRights, "AccessRights"),
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

  async parseResponse(response: Response): Promise<RevokeSharedLinkResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RevokeSharedLinkResponse;
    return (await response.json()) as RevokeSharedLinkResponse;
  }
}
