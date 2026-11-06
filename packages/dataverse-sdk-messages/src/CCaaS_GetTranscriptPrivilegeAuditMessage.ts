import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_GetTranscriptPrivilegeAuditResponse as CCaaS_GetTranscriptPrivilegeAuditResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_GetTranscriptPrivilegeAudit message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetTranscriptPrivilegeAuditRequestParameters {
  ApiVersion: string;
}

/**
 * CCaaS_GetTranscriptPrivilegeAudit request message
 *
 * Web API Action: CCaaS_GetTranscriptPrivilegeAudit
 */
export class CCaaS_GetTranscriptPrivilegeAuditRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetTranscriptPrivilegeAuditResponse>
{
  declare readonly Parameters: Readonly<CCaaS_GetTranscriptPrivilegeAuditRequestParameters>;

  constructor(parameters: CCaaS_GetTranscriptPrivilegeAuditRequestParameters) {
    super("CCaaS_GetTranscriptPrivilegeAudit", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetTranscriptPrivilegeAudit`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_GetTranscriptPrivilegeAuditResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_GetTranscriptPrivilegeAuditResponse.fromResponse({});
    return CCaaS_GetTranscriptPrivilegeAuditResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_GetTranscriptPrivilegeAudit response message
 */
export class CCaaS_GetTranscriptPrivilegeAuditResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetTranscriptPrivilegeAuditResponseData) {
    super("CCaaS_GetTranscriptPrivilegeAudit");
  }

  static fromResponse(data: unknown): CCaaS_GetTranscriptPrivilegeAuditResponse {
    return new CCaaS_GetTranscriptPrivilegeAuditResponse(
      responseObject<CCaaS_GetTranscriptPrivilegeAuditResponseData>(data)
    );
  }
}
