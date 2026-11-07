import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { knowledgearticle, msdyn_kbattachment } from "./types/index.js";

/**
 * Parameters of the msdyn_UpdateKbAttachmentPrivilege message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateKbAttachmentPrivilegeRequestParameters {
  KbAttachmentId: EntityReference | EntityPayload<msdyn_kbattachment>;
  ParentKnowledgeArticleId: EntityReference | EntityPayload<knowledgearticle>;
  PrincipalId: EntityReference | AnyEntityPayload;
  AccessMask?: string;
}

/**
 * msdyn_UpdateKbAttachmentPrivilege request message
 *
 * Web API Action: msdyn_UpdateKbAttachmentPrivilege
 */
export class msdyn_UpdateKbAttachmentPrivilegeRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateKbAttachmentPrivilegeResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateKbAttachmentPrivilegeRequestParameters>;

  constructor(parameters: msdyn_UpdateKbAttachmentPrivilegeRequestParameters) {
    super("msdyn_UpdateKbAttachmentPrivilege", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateKbAttachmentPrivilege`;

    const body = requestBody({
      KbAttachmentId: this.Parameters.KbAttachmentId,
      ParentKnowledgeArticleId: this.Parameters.ParentKnowledgeArticleId,
      PrincipalId: this.Parameters.PrincipalId,
      AccessMask: this.Parameters.AccessMask,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateKbAttachmentPrivilegeResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_UpdateKbAttachmentPrivilegeResponse());
  }
}

/**
 * msdyn_UpdateKbAttachmentPrivilege response message
 */
export class msdyn_UpdateKbAttachmentPrivilegeResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateKbAttachmentPrivilege");
  }

  static fromResponse(_data?: unknown): msdyn_UpdateKbAttachmentPrivilegeResponse {
    return new msdyn_UpdateKbAttachmentPrivilegeResponse();
  }
}
