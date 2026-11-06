import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from GetCertificateCredential action
 */
export interface GetCertificateCredentialResponse {
  value: EntityReference[];
}

/**
 * Parameters of the GetCertificateCredential action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetCertificateCredentialActionParameters {
  entityId: string;
  entityLogicalName: string;
}

/**
 * GetCertificateCredential action
 *
 * Unbound action
 */
export class GetCertificateCredentialAction implements Executable<GetCertificateCredentialResponse> {
  constructor(public readonly parameters: GetCertificateCredentialActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetCertificateCredential`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<GetCertificateCredentialResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetCertificateCredentialResponse;
    return (await response.json()) as GetCertificateCredentialResponse;
  }
}
