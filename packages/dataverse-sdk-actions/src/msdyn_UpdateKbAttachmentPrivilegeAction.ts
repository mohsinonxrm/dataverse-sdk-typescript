import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { knowledgearticle, msdyn_kbattachment } from "./types/index.js";

/**
 * Response from msdyn_UpdateKbAttachmentPrivilege action
 */
export interface msdyn_UpdateKbAttachmentPrivilegeResponse {
  // No content returned
}

/**
 * msdyn_UpdateKbAttachmentPrivilege action
 *
 * Unbound action
 */
export class msdyn_UpdateKbAttachmentPrivilegeAction implements Executable<msdyn_UpdateKbAttachmentPrivilegeResponse> {
  constructor(
    public readonly kbAttachmentId: msdyn_kbattachment,
    public readonly parentKnowledgeArticleId: knowledgearticle,
    public readonly principalId: EntityReference,
    public readonly accessMask: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateKbAttachmentPrivilege`;

    const body: Record<string, unknown> = {
      KbAttachmentId: this.kbAttachmentId,
      ParentKnowledgeArticleId: this.parentKnowledgeArticleId,
      PrincipalId: this.principalId,
      AccessMask: this.accessMask,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateKbAttachmentPrivilegeResponse> {
    // No return value (204 No Content)
    return {};
  }
}
