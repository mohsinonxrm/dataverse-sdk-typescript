import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { adx_GenerateSharedAccessSignatureResponse as adx_GenerateSharedAccessSignatureResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return adx_GenerateSharedAccessSignatureResponse.fromResponse({});
    return adx_GenerateSharedAccessSignatureResponse.fromResponse(await response.json());
  }
}

/**
 * adx_GenerateSharedAccessSignature response message
 */
export class adx_GenerateSharedAccessSignatureResponse extends OrganizationResponse {
  constructor(public result: adx_GenerateSharedAccessSignatureResponseData) {
    super("adx_GenerateSharedAccessSignature");
  }

  static fromResponse(data: unknown): adx_GenerateSharedAccessSignatureResponse {
    return new adx_GenerateSharedAccessSignatureResponse(
      responseObject<adx_GenerateSharedAccessSignatureResponseData>(data)
    );
  }
}
