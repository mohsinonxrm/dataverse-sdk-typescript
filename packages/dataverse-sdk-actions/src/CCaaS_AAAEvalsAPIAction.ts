import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the CCaaS_AAAEvalsAPI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_AAAEvalsAPIResponse {
  "@odata.context"?: string;
  ErrorMessage: string;
  ResponseData: string;
  StatusCode: string;
}

/**
 * CCaaS_AAAEvalsAPI action
 *
 * Unbound action
 */
export class CCaaS_AAAEvalsAPIAction implements Executable<CCaaS_AAAEvalsAPIResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_AAAEvalsAPI`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_AAAEvalsAPIResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_AAAEvalsAPIResponse;
  }
}
