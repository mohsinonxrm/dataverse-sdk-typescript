import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from GetCertificateCredential action
 */
export interface GetCertificateCredentialResponse {
  value: EntityReference[];
}

/**
 * GetCertificateCredential action
 *
 * Unbound action
 */
export class GetCertificateCredentialAction implements Executable<GetCertificateCredentialResponse> {
  constructor(
    public readonly entityId: string,
    public readonly entityLogicalName: string
  ) {}

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
    return data as GetCertificateCredentialResponse;
  }
}
