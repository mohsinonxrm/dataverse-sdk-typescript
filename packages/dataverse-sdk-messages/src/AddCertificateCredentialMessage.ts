import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * AddCertificateCredential request message
 *
 * Web API Action: AddCertificateCredential
 */
export class AddCertificateCredentialRequest
  extends OrganizationRequest
  implements Executable<AddCertificateCredentialResponse>
{
  constructor(
    public entityLogicalName: string,
    public entityId: string,
    public thumbprint: string
  ) {
    super("AddCertificateCredential");
  }

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
    return new AddCertificateCredentialResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entityLogicalName: this.entityLogicalName,
      entityId: this.entityId,
      thumbprint: this.thumbprint,
    };
  }
}

/**
 * AddCertificateCredential response message
 */
export class AddCertificateCredentialResponse extends OrganizationResponse {
  constructor() {
    super("AddCertificateCredential");
  }

  static fromResponse(_data: unknown): AddCertificateCredentialResponse {
    return new AddCertificateCredentialResponse();
  }
}
