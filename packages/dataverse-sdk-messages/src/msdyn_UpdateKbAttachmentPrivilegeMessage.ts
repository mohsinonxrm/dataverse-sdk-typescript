import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { knowledgearticle, msdyn_kbattachment } from "./types/index.js";

/**
 * msdyn_UpdateKbAttachmentPrivilege request message
 *
 * Web API Action: msdyn_UpdateKbAttachmentPrivilege
 */
export class msdyn_UpdateKbAttachmentPrivilegeRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateKbAttachmentPrivilegeResponse>
{
  constructor(
    public kbAttachmentId: msdyn_kbattachment,
    public parentKnowledgeArticleId: knowledgearticle,
    public principalId: EntityReference,
    public accessMask: string
  ) {
    super("msdyn_UpdateKbAttachmentPrivilege");
  }

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
    return new msdyn_UpdateKbAttachmentPrivilegeResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      KbAttachmentId: this.kbAttachmentId,
      ParentKnowledgeArticleId: this.parentKnowledgeArticleId,
      PrincipalId: this.principalId,
      AccessMask: this.accessMask,
    };
  }
}

/**
 * msdyn_UpdateKbAttachmentPrivilege response message
 */
export class msdyn_UpdateKbAttachmentPrivilegeResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateKbAttachmentPrivilege");
  }

  static fromResponse(_data: unknown): msdyn_UpdateKbAttachmentPrivilegeResponse {
    return new msdyn_UpdateKbAttachmentPrivilegeResponse();
  }
}
