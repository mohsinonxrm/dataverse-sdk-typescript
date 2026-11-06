import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the adx_GenerateSharedAccessSignature message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface adx_GenerateSharedAccessSignatureRequestParameters {
  Permissions?: number;
  ResourceType?: number;
  Resource?: string;
}

/**
 * adx_GenerateSharedAccessSignature request message
 *
 * Web API Action: adx_GenerateSharedAccessSignature
 */
export class adx_GenerateSharedAccessSignatureRequest
  extends OrganizationRequest
  implements Executable<adx_GenerateSharedAccessSignatureResponse>
{
  declare readonly Parameters: Readonly<adx_GenerateSharedAccessSignatureRequestParameters>;

  constructor(parameters: adx_GenerateSharedAccessSignatureRequestParameters = {}) {
    super("adx_GenerateSharedAccessSignature", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/adx_GenerateSharedAccessSignature`;

    const body = requestBody({
      Permissions: this.Parameters.Permissions,
      ResourceType: this.Parameters.ResourceType,
      Resource: this.Parameters.Resource,
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

  async parseResponse(response: Response): Promise<adx_GenerateSharedAccessSignatureResponse> {
    // The body is the complex value, with its @odata.context
    return adx_GenerateSharedAccessSignatureResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the adx_GenerateSharedAccessSignature action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface adx_GenerateSharedAccessSignatureResult {
  "@odata.context"?: string;
  SharedAccessSignature: string;
}

/**
 * adx_GenerateSharedAccessSignature response message
 *
 * `result` is the value the adx_GenerateSharedAccessSignature action returns (see {@link adx_GenerateSharedAccessSignatureResult}).
 */
export class adx_GenerateSharedAccessSignatureResponse extends OrganizationResponse {
  constructor(public result: adx_GenerateSharedAccessSignatureResult) {
    super("adx_GenerateSharedAccessSignature");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): adx_GenerateSharedAccessSignatureResponse {
    return new adx_GenerateSharedAccessSignatureResponse(
      data as adx_GenerateSharedAccessSignatureResult
    );
  }
}
