import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the DeprovisionLanguage action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type DeprovisionLanguageResponse = void;

/**
 * Parameters of the DeprovisionLanguage action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeprovisionLanguageActionParameters {
  Language: number;
  CleanupLanguageRows?: boolean;
}

/**
 * DeprovisionLanguage action
 *
 * Unbound action
 */
export class DeprovisionLanguageAction implements Executable<DeprovisionLanguageResponse> {
  constructor(public readonly parameters: DeprovisionLanguageActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeprovisionLanguage`;

    const body = requestBody({
      Language: this.parameters.Language,
      CleanupLanguageRows: this.parameters.CleanupLanguageRows,
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

  parseResponse(_response: Response): Promise<DeprovisionLanguageResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
