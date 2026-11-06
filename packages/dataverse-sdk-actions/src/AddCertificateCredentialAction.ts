import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from AddCertificateCredential action
 */
export interface AddCertificateCredentialResponse {
  // No content returned
}

/**
 * Parameters of the AddCertificateCredential action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddCertificateCredentialActionParameters {
  entityLogicalName: string;
  entityId: string;
  thumbprint: string;
}

/**
 * AddCertificateCredential action
 *
 * Unbound action
 */
export class AddCertificateCredentialAction implements Executable<AddCertificateCredentialResponse> {
  constructor(public readonly parameters: AddCertificateCredentialActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddCertificateCredential`;

    const body = requestBody({
      entityLogicalName: this.parameters.entityLogicalName,
      entityId: this.parameters.entityId,
      thumbprint: this.parameters.thumbprint,
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

  async parseResponse(response: Response): Promise<AddCertificateCredentialResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as AddCertificateCredentialResponse;
  }
}
