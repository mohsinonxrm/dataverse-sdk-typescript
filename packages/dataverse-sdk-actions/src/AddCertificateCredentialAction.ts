import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AddCertificateCredential action
 */
export interface AddCertificateCredentialResponse {
  // No content returned
}

/**
 * AddCertificateCredential action
 *
 * Unbound action
 */
export class AddCertificateCredentialAction implements Executable<AddCertificateCredentialResponse> {
  constructor(
    public readonly entityLogicalName: string,
    public readonly entityId: string,
    public readonly thumbprint: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddCertificateCredential`;

    const body: Record<string, unknown> = {
      entityLogicalName: this.entityLogicalName,
      entityId: this.entityId,
      thumbprint: this.thumbprint,
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

  async parseResponse(response: Response): Promise<AddCertificateCredentialResponse> {
    // No return value (204 No Content)
    return {};
  }
}
