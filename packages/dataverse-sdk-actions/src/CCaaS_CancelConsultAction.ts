import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_CancelConsult action
 */
export interface CCaaS_CancelConsultResponse {
  // No content returned
}

/**
 * CCaaS_CancelConsult action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocliveworkitem)
 */
export class CCaaS_CancelConsultAction implements Executable<CCaaS_CancelConsultResponse> {
  constructor(
    public readonly msdyn_ocliveworkitemId: string,
    public readonly apiVersion: string,
    public readonly sessionId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_CancelConsult`;

    const body: Record<string, unknown> = {
      ApiVersion: this.apiVersion,
      SessionId: this.sessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_CancelConsultResponse> {
    // No return value (204 No Content)
    return {};
  }
}
