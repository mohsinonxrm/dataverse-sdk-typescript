import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ConfirmConsentCode request message
 *
 * Web API Action: ConfirmConsentCode
 */
export class ConfirmConsentCodeRequest
  extends OrganizationRequest
  implements Executable<ConfirmConsentCodeResponse>
{
  constructor(
    public connectioninstanceId: string,
    public code: string
  ) {
    super("ConfirmConsentCode");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/connectioninstances(${this.connectioninstanceId})/Microsoft.Dynamics.CRM.ConfirmConsentCode`;

    const body: Record<string, unknown> = {
      code: this.code,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ConfirmConsentCodeResponse> {
    // No return value (204 No Content)
    return new ConfirmConsentCodeResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.connectioninstanceId,
      code: this.code,
    };
  }
}

/**
 * ConfirmConsentCode response message
 */
export class ConfirmConsentCodeResponse extends OrganizationResponse {
  constructor() {
    super("ConfirmConsentCode");
  }

  static fromResponse(_data: unknown): ConfirmConsentCodeResponse {
    return new ConfirmConsentCodeResponse();
  }
}
