import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type { TypedQueryBase } from "./types/index.js";

/**
 * Response from the BackgroundSendEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface BackgroundSendEmailResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as BackgroundSendEmailResponse;
  }
}
