import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the RemoveCertificateCredential message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveCertificateCredentialRequestParameters {
  entityId: string;
  certificateCredentialId?: string;
  entityLogicalName: string;
}

/**
 * RemoveCertificateCredential request message
 *
 * Web API Action: RemoveCertificateCredential
 */
export class RemoveCertificateCredentialRequest
  extends OrganizationRequest
  implements Executable<RemoveCertificateCredentialResponse>
{
  declare readonly Parameters: Readonly<RemoveCertificateCredentialRequestParameters>;

  constructor(parameters: RemoveCertificateCredentialRequestParameters) {
    super("RemoveCertificateCredential", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveCertificateCredential`;

    const body = requestBody({
      entityId: this.Parameters.entityId,
      certificateCredentialId: this.Parameters.certificateCredentialId,
      entityLogicalName: this.Parameters.entityLogicalName,
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
    // No return value (204 No Content)
    return Promise.resolve(new RemoveCertificateCredentialResponse());
  }
}

/**
 * RemoveCertificateCredential response message
 */
export class RemoveCertificateCredentialResponse extends OrganizationResponse {
  constructor() {
    super("RemoveCertificateCredential");
  }

  static fromResponse(_data?: unknown): RemoveCertificateCredentialResponse {
    return new RemoveCertificateCredentialResponse();
  }
}
