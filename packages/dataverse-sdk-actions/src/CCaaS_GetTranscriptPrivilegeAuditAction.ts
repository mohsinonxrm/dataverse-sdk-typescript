import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_GetTranscriptPrivilegeAudit action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetTranscriptPrivilegeAuditResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_GetTranscriptPrivilegeAuditResponse;
  }
}
