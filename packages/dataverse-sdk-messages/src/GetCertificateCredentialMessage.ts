import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return GetCertificateCredentialResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return GetCertificateCredentialResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetCertificateCredential action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type GetCertificateCredentialResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * GetCertificateCredential response message
 *
 * `result` is the value the GetCertificateCredential action returns (see {@link GetCertificateCredentialResult}).
 */
export class GetCertificateCredentialResponse extends OrganizationResponse {
  constructor(public result: GetCertificateCredentialResult) {
    super("GetCertificateCredential");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetCertificateCredentialResponse {
    return new GetCertificateCredentialResponse(
      data === undefined ? [] : (data as { value: GetCertificateCredentialResult }).value
    );
  }
}
