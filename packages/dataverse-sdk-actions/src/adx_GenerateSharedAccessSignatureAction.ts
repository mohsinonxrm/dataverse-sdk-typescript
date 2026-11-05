import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from adx_GenerateSharedAccessSignature action
 */
export interface adx_GenerateSharedAccessSignatureResponse {
  SharedAccessSignature: string;
}

/**
 * adx_GenerateSharedAccessSignature action
 *
 * Unbound action
 */
export class adx_GenerateSharedAccessSignatureAction implements Executable<adx_GenerateSharedAccessSignatureResponse> {
  constructor(
    public readonly permissions: number,
    public readonly resourceType: number,
    public readonly resource: string
  ) {}

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<adx_GenerateSharedAccessSignatureResponse> {
    const data = await response.json();
    return data as adx_GenerateSharedAccessSignatureResponse;
  }
}
