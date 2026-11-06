import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the GetPluginCertificateInfo function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetPluginCertificateInfoResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetPluginCertificateInfoResponse;
  }
}
