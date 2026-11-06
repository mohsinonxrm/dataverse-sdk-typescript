import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_EmailValidationCustomAction action
 */
export interface msdyn_EmailValidationCustomActionResponse {
  EmailValidationResponse: string;
  IsSuccess: boolean;
  StatusCode: number;
  ErrorMessage: string;
}

/**
 * msdyn_EmailValidationCustomAction action
 *
 * Unbound action
 */
export class msdyn_EmailValidationCustomActionAction implements Executable<msdyn_EmailValidationCustomActionResponse> {
  constructor(public readonly emailValidationRequest?: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EmailValidationCustomAction`;

    const body: Record<string, unknown> = {
      EmailValidationRequest: this.emailValidationRequest,
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

  async parseResponse(response: Response): Promise<msdyn_EmailValidationCustomActionResponse> {
    const data = await response.json();
    return data as msdyn_EmailValidationCustomActionResponse;
  }
}
