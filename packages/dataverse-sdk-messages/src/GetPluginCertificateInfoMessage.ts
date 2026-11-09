import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the GetPluginCertificateInfo message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetPluginCertificateInfoRequestParameters {
  ComponentName: string;
  ComponentId: string;
}

/**
 * GetPluginCertificateInfo request message
 *
 * Web API Function: GetPluginCertificateInfo
 */
export class GetPluginCertificateInfoRequest
  extends OrganizationRequest
  implements Executable<GetPluginCertificateInfoResponse>
{
  declare readonly Parameters: Readonly<GetPluginCertificateInfoRequestParameters>;

  constructor(parameters: GetPluginCertificateInfoRequestParameters) {
    super("GetPluginCertificateInfo", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetPluginCertificateInfo`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ComponentName !== undefined) {
      aliases.push(`ComponentName=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ComponentName, "Edm.String"));
    }
    if (this.Parameters.ComponentId !== undefined) {
      aliases.push(`ComponentId=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.ComponentId, "Edm.Guid"));
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
    return GetPluginCertificateInfoResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetPluginCertificateInfo function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetPluginCertificateInfoResult {
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
 * GetPluginCertificateInfo response message
 *
 * `result` is the value the GetPluginCertificateInfo function returns (see {@link GetPluginCertificateInfoResult}).
 */
export class GetPluginCertificateInfoResponse extends OrganizationResponse {
  constructor(public result: GetPluginCertificateInfoResult) {
    super("GetPluginCertificateInfo");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetPluginCertificateInfoResponse {
    return new GetPluginCertificateInfoResponse(data as GetPluginCertificateInfoResult);
  }
}
