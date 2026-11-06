import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from PreValidateGitComponents action
 */
export interface PreValidateGitComponentsResponse {
  ValidationMessages: string;
}

/**
 * Parameters of the PreValidateGitComponents action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PreValidateGitComponentsActionParameters {
  SolutionUniqueName: string;
  IsRetriableOnly?: boolean;
}

/**
 * PreValidateGitComponents action
 *
 * Unbound action
 */
export class PreValidateGitComponentsAction implements Executable<PreValidateGitComponentsResponse> {
  constructor(public readonly parameters: PreValidateGitComponentsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PreValidateGitComponents`;

    const body = requestBody({
      SolutionUniqueName: this.parameters.SolutionUniqueName,
      IsRetriableOnly: this.parameters.IsRetriableOnly,
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

  async parseResponse(response: Response): Promise<PreValidateGitComponentsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PreValidateGitComponentsResponse;
    return (await response.json()) as PreValidateGitComponentsResponse;
  }
}
