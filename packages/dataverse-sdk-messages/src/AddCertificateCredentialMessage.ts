import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AddCertificateCredential message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddCertificateCredentialRequestParameters {
  entityLogicalName: string;
  entityId: string;
  thumbprint: string;
}

/**
 * AddCertificateCredential request message
 *
 * Web API Action: AddCertificateCredential
 */
export class AddCertificateCredentialRequest
  extends OrganizationRequest
  implements Executable<AddCertificateCredentialResponse>
{
  declare readonly Parameters: Readonly<AddCertificateCredentialRequestParameters>;

  constructor(parameters: AddCertificateCredentialRequestParameters) {
    super("AddCertificateCredential", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddCertificateCredential`;

    const body = requestBody({
      entityLogicalName: this.Parameters.entityLogicalName,
      entityId: this.Parameters.entityId,
      thumbprint: this.Parameters.thumbprint,
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
    // No return value (204 No Content)
    return new AddCertificateCredentialResponse();
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
