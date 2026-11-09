import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the PreValidateGitComponents action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PreValidateGitComponentsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as PreValidateGitComponentsResponse;
  }
}
