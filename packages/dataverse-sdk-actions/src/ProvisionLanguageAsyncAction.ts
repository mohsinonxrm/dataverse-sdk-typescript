import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ProvisionLanguageAsync action
 */
export interface ProvisionLanguageAsyncResponse {
  AsyncOperationId: string;
}

/**
 * Parameters of the ProvisionLanguageAsync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ProvisionLanguageAsyncActionParameters {
  Language: number;
}

/**
 * ProvisionLanguageAsync action
 *
 * Unbound action
 */
export class ProvisionLanguageAsyncAction implements Executable<ProvisionLanguageAsyncResponse> {
  constructor(public readonly parameters: ProvisionLanguageAsyncActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ProvisionLanguageAsync`;

    const body = requestBody({
      Language: this.parameters.Language,
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

  async parseResponse(response: Response): Promise<ProvisionLanguageAsyncResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ProvisionLanguageAsyncResponse;
    return (await response.json()) as ProvisionLanguageAsyncResponse;
  }
}
