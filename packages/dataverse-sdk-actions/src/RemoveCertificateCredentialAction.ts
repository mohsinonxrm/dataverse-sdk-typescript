import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RemoveCertificateCredential action
 */
export interface RemoveCertificateCredentialResponse {
  // No content returned
}

/**
 * RemoveCertificateCredential action
 *
 * Unbound action
 */
export class RemoveCertificateCredentialAction implements Executable<RemoveCertificateCredentialResponse> {
  constructor(
    public readonly certificateCredentialId: string,
    public readonly entityId: string,
    public readonly entityLogicalName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveCertificateCredential`;

    const body: Record<string, unknown> = {
      certificateCredentialId: this.certificateCredentialId,
      entityId: this.entityId,
      entityLogicalName: this.entityLogicalName,
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

  async parseResponse(response: Response): Promise<RemoveCertificateCredentialResponse> {
    // No return value (204 No Content)
    return {};
  }
}
