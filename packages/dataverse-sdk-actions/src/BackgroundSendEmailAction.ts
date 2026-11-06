import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { TypedQueryBase } from "./types/index.js";

/**
 * Response from BackgroundSendEmail action
 */
export interface BackgroundSendEmailResponse {
  HasAttachments: boolean[];
}

/**
 * Parameters of the BackgroundSendEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface BackgroundSendEmailActionParameters {
  Query?: TypedQueryBase;
}

/**
 * BackgroundSendEmail action
 *
 * Unbound action
 */
export class BackgroundSendEmailAction implements Executable<BackgroundSendEmailResponse> {
  constructor(public readonly parameters: BackgroundSendEmailActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BackgroundSendEmail`;

    const body = requestBody({
      Query: enumBody(this.parameters.Query, "QueryBase"),
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

  async parseResponse(response: Response): Promise<BackgroundSendEmailResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as BackgroundSendEmailResponse;
    return (await response.json()) as BackgroundSendEmailResponse;
  }
}
