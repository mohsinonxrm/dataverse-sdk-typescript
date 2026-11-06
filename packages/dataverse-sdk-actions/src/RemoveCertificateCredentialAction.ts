import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from RemoveCertificateCredential action
 */
export interface RemoveCertificateCredentialResponse {
  // No content returned
}

/**
 * Parameters of the RemoveCertificateCredential action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveCertificateCredentialActionParameters {
  certificateCredentialId?: string;
  entityId: string;
  entityLogicalName: string;
}

/**
 * RemoveCertificateCredential action
 *
 * Unbound action
 */
export class RemoveCertificateCredentialAction implements Executable<RemoveCertificateCredentialResponse> {
  constructor(public readonly parameters: RemoveCertificateCredentialActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveCertificateCredential`;

    const body = requestBody({
      certificateCredentialId: this.parameters.certificateCredentialId,
      entityId: this.parameters.entityId,
      entityLogicalName: this.parameters.entityLogicalName,
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

  async parseResponse(response: Response): Promise<RemoveCertificateCredentialResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RemoveCertificateCredentialResponse;
  }
}
