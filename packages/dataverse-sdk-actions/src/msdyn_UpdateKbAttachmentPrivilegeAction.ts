import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { knowledgearticle, msdyn_kbattachment } from "./types/index.js";

/**
 * Response from msdyn_UpdateKbAttachmentPrivilege action
 */
export interface msdyn_UpdateKbAttachmentPrivilegeResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_UpdateKbAttachmentPrivilege action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateKbAttachmentPrivilegeActionParameters {
  KbAttachmentId: EntityReference | EntityPayload<msdyn_kbattachment>;
  ParentKnowledgeArticleId: EntityReference | EntityPayload<knowledgearticle>;
  PrincipalId: EntityReference | AnyEntityPayload;
  AccessMask?: string;
}

/**
 * msdyn_UpdateKbAttachmentPrivilege action
 *
 * Unbound action
 */
export class msdyn_UpdateKbAttachmentPrivilegeAction implements Executable<msdyn_UpdateKbAttachmentPrivilegeResponse> {
  constructor(public readonly parameters: msdyn_UpdateKbAttachmentPrivilegeActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateKbAttachmentPrivilege`;

    const body = requestBody({
      KbAttachmentId: this.parameters.KbAttachmentId,
      ParentKnowledgeArticleId: this.parameters.ParentKnowledgeArticleId,
      PrincipalId: this.parameters.PrincipalId,
      AccessMask: this.parameters.AccessMask,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateKbAttachmentPrivilegeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdateKbAttachmentPrivilegeResponse;
    return (await response.json()) as msdyn_UpdateKbAttachmentPrivilegeResponse;
  }
}
