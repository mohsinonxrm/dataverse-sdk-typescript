import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the RemoveCertificateCredential action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RemoveCertificateCredentialResponse = void;

/**
 * Parameters of the RemoveCertificateCredential action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveCertificateCredentialActionParameters {
  entityId: string;
  certificateCredentialId?: string;
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
      entityId: this.parameters.entityId,
      certificateCredentialId: this.parameters.certificateCredentialId,
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

  parseResponse(_response: Response): Promise<RemoveCertificateCredentialResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
