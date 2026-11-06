import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AddCertificateCredential action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type AddCertificateCredentialResponse = void;

/**
 * Parameters of the AddCertificateCredential action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddCertificateCredentialActionParameters {
  thumbprint: string;
  entityId: string;
  entityLogicalName: string;
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
      thumbprint: this.parameters.thumbprint,
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

  parseResponse(_response: Response): Promise<AddCertificateCredentialResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
