import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from GetPluginCertificateInfo function
 */
export interface GetPluginCertificateInfoResponse {
  CertificateHash: string;
  CertificateSegment: string;
  CertificateSegmentV2: string;
  EncodedIssuer: string;
  EncodedSubject: string;
  IsSelfSigned: boolean;
  IssuerDN: string;
  SubjectDN: string;
}

/**
 * Parameters of the GetPluginCertificateInfo function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetPluginCertificateInfoFunctionParameters {
  ComponentName: string;
  ComponentId: string;
}

/**
 * GetPluginCertificateInfo function
 *
 * Unbound function
 */
export class GetPluginCertificateInfoFunction implements Executable<GetPluginCertificateInfoResponse> {
  constructor(public readonly parameters: GetPluginCertificateInfoFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetPluginCertificateInfo`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ComponentName !== undefined) {
      aliases.push(`ComponentName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.ComponentName, "Edm.String"));
    }
    if (this.parameters.ComponentId !== undefined) {
      aliases.push(`ComponentId=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.ComponentId, "Edm.Guid"));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetPluginCertificateInfoResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetPluginCertificateInfoResponse;
    return (await response.json()) as GetPluginCertificateInfoResponse;
  }
}
