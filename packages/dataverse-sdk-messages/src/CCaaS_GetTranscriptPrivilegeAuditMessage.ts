import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CCaaS_GetTranscriptPrivilegeAuditResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_GetTranscriptPrivilegeAudit action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetTranscriptPrivilegeAuditResult {
  "@odata.context"?: string;
  ResponseBody: string;
}

/**
 * CCaaS_GetTranscriptPrivilegeAudit response message
 *
 * `result` is the value the CCaaS_GetTranscriptPrivilegeAudit action returns (see {@link CCaaS_GetTranscriptPrivilegeAuditResult}).
 */
export class CCaaS_GetTranscriptPrivilegeAuditResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetTranscriptPrivilegeAuditResult) {
    super("CCaaS_GetTranscriptPrivilegeAudit");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_GetTranscriptPrivilegeAuditResponse {
    return new CCaaS_GetTranscriptPrivilegeAuditResponse(
      data as CCaaS_GetTranscriptPrivilegeAuditResult
    );
  }
}
