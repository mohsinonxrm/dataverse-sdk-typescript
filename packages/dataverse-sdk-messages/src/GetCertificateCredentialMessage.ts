import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the GetCertificateCredential message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetCertificateCredentialRequestParameters {
  entityId: string;
  entityLogicalName: string;
}

/**
 * GetCertificateCredential request message
 *
 * Web API Action: GetCertificateCredential
 */
export class GetCertificateCredentialRequest
  extends OrganizationRequest
  implements Executable<GetCertificateCredentialResponse>
{
  declare readonly Parameters: Readonly<GetCertificateCredentialRequestParameters>;

  constructor(parameters: GetCertificateCredentialRequestParameters) {
    super("GetCertificateCredential", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetCertificateCredential`;

    const body = requestBody({
      entityId: this.Parameters.entityId,
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

  async parseResponse(response: Response): Promise<GetCertificateCredentialResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return GetCertificateCredentialResponse.fromResponse(text ? JSON.parse(text) : {});
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
