import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from adx_GenerateSharedAccessSignature action
 */
export interface adx_GenerateSharedAccessSignatureResponse {
  SharedAccessSignature: string;
}

/**
 * Parameters of the adx_GenerateSharedAccessSignature action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface adx_GenerateSharedAccessSignatureActionParameters {
  Permissions?: number;
  ResourceType?: number;
  Resource?: string;
}

/**
 * adx_GenerateSharedAccessSignature action
 *
 * Unbound action
 */
export class adx_GenerateSharedAccessSignatureAction implements Executable<adx_GenerateSharedAccessSignatureResponse> {
  constructor(public readonly parameters: adx_GenerateSharedAccessSignatureActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/adx_GenerateSharedAccessSignature`;

    const body = requestBody({
      Permissions: this.parameters.Permissions,
      ResourceType: this.parameters.ResourceType,
      Resource: this.parameters.Resource,
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
    if (response.status === 204) return {} as adx_GenerateSharedAccessSignatureResponse;
    return (await response.json()) as adx_GenerateSharedAccessSignatureResponse;
  }
}
