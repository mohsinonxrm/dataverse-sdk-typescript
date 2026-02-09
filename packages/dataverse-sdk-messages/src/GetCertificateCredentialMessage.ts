import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * GetCertificateCredential request message
 *
 * Web API Action: GetCertificateCredential
 */
export class GetCertificateCredentialRequest
  extends OrganizationRequest
  implements Executable<GetCertificateCredentialResponse>
{
  constructor(
    public entityId: string,
    public entityLogicalName: string
  ) {
    super("GetCertificateCredential");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetCertificateCredential`;

    const body: Record<string, unknown> = {
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

  async parseResponse(response: Response): Promise<GetCertificateCredentialResponse> {
    const data = await response.json();
    return GetCertificateCredentialResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entityId: this.entityId,
      entityLogicalName: this.entityLogicalName,
    };
  }
}

/**
 * GetCertificateCredential response message
 */
export class GetCertificateCredentialResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("GetCertificateCredential");
  }

  static fromResponse(data: unknown): GetCertificateCredentialResponse {
    return new GetCertificateCredentialResponse((data as any).value);
  }
}
