import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the GrantAccessUsingSharedLink action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type GrantAccessUsingSharedLinkResponse = void;

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

  parseResponse(_response: Response): Promise<GrantAccessUsingSharedLinkResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
