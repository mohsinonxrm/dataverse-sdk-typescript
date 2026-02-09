import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * adx_GenerateSharedAccessSignature request message
 *
 * Web API Action: adx_GenerateSharedAccessSignature
 */
export class adx_GenerateSharedAccessSignatureRequest
  extends OrganizationRequest
  implements Executable<adx_GenerateSharedAccessSignatureResponse>
{
  constructor(
    public permissions: number,
    public resourceType: number,
    public resource: string
  ) {
    super("adx_GenerateSharedAccessSignature");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/adx_GenerateSharedAccessSignature`;

    const body: Record<string, unknown> = {
      Permissions: this.permissions,
      ResourceType: this.resourceType,
      Resource: this.resource,
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

  async parseResponse(response: Response): Promise<adx_GenerateSharedAccessSignatureResponse> {
    const data = await response.json();
    return adx_GenerateSharedAccessSignatureResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Permissions: this.permissions,
      ResourceType: this.resourceType,
      Resource: this.resource,
    };
  }
}

/**
 * adx_GenerateSharedAccessSignature response message
 */
export class adx_GenerateSharedAccessSignatureResponse extends OrganizationResponse {
  constructor(public result: adx_GenerateSharedAccessSignatureResponse) {
    super("adx_GenerateSharedAccessSignature");
  }

  static fromResponse(data: unknown): adx_GenerateSharedAccessSignatureResponse {
    return new adx_GenerateSharedAccessSignatureResponse((data as any).value);
  }
}
