import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from GrantAccessUsingSharedLink action
 */
export interface GrantAccessUsingSharedLinkResponse {
  // No content returned
}

/**
 * Parameters of the GrantAccessUsingSharedLink action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GrantAccessUsingSharedLinkActionParameters {
  RecordUrlWithSharedLink: string;
}

/**
 * GrantAccessUsingSharedLink action
 *
 * Unbound action
 */
export class GrantAccessUsingSharedLinkAction implements Executable<GrantAccessUsingSharedLinkResponse> {
  constructor(public readonly parameters: GrantAccessUsingSharedLinkActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GrantAccessUsingSharedLink`;

    const body = requestBody({
      RecordUrlWithSharedLink: this.parameters.RecordUrlWithSharedLink,
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

  async parseResponse(response: Response): Promise<GrantAccessUsingSharedLinkResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GrantAccessUsingSharedLinkResponse;
    return (await response.json()) as GrantAccessUsingSharedLinkResponse;
  }
}
