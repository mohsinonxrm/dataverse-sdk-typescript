import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CCaaS_AAAEvalsAPI action
 */
export interface CCaaS_AAAEvalsAPIResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_AAAEvalsAPIResponse;
    return (await response.json()) as CCaaS_AAAEvalsAPIResponse;
  }
}
