import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { AccessRights } from "./types/index.js";

/**
 * Response from the RevokeSharedLink action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RevokeSharedLinkResponse = void;

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

  parseResponse(_response: Response): Promise<RevokeSharedLinkResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
