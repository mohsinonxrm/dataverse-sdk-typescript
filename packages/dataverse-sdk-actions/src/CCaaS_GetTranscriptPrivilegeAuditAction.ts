import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_GetTranscriptPrivilegeAudit action
 */
export interface CCaaS_GetTranscriptPrivilegeAuditResponse {
  ResponseBody: string;
}

/**
 * Parameters of the CCaaS_GetTranscriptPrivilegeAudit action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetTranscriptPrivilegeAuditActionParameters {
  ApiVersion: string;
}

/**
 * CCaaS_GetTranscriptPrivilegeAudit action
 *
 * Unbound action
 */
export class CCaaS_GetTranscriptPrivilegeAuditAction implements Executable<CCaaS_GetTranscriptPrivilegeAuditResponse> {
  constructor(public readonly parameters: CCaaS_GetTranscriptPrivilegeAuditActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_GetTranscriptPrivilegeAudit`;

    const body = requestBody({
      ApiVersion: this.parameters.ApiVersion,
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
    if (response.status === 204) return {} as CCaaS_GetTranscriptPrivilegeAuditResponse;
    return (await response.json()) as CCaaS_GetTranscriptPrivilegeAuditResponse;
  }
}
