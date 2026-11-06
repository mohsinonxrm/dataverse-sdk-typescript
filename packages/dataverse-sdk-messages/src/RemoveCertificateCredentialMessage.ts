import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RemoveCertificateCredential request message
 *
 * Web API Action: RemoveCertificateCredential
 */
export class RemoveCertificateCredentialRequest
  extends OrganizationRequest
  implements Executable<RemoveCertificateCredentialResponse>
{
  constructor(
    public certificateCredentialId: string,
    public entityId: string,
    public entityLogicalName: string
  ) {
    super("RemoveCertificateCredential");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RemoveCertificateCredentialResponse> {
    // No return value (204 No Content)
    return new RemoveCertificateCredentialResponse();
  }
}

/**
 * RemoveCertificateCredential response message
 */
export class RemoveCertificateCredentialResponse extends OrganizationResponse {
  constructor() {
    super("RemoveCertificateCredential");
  }

  static fromResponse(_data: unknown): RemoveCertificateCredentialResponse {
    return new RemoveCertificateCredentialResponse();
  }
}
