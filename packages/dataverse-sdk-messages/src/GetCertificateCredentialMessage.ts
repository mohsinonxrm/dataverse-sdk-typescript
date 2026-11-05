import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GetCertificateCredentialResponse> {
    const data = await response.json();
    return GetCertificateCredentialResponse.fromResponse(data);
  }
}

/**
 * GetCertificateCredential response message
 */
export class GetCertificateCredentialResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("GetCertificateCredential");
  }

  static fromResponse(data: unknown): GetCertificateCredentialResponse {
    return new GetCertificateCredentialResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
