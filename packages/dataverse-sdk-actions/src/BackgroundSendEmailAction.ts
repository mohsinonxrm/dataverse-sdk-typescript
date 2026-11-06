import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { enumBody } from "./internal/enumBody.js";
import type { TypedQueryBase } from "./types/index.js";

/**
 * Response from BackgroundSendEmail action
 */
export interface BackgroundSendEmailResponse {
  HasAttachments: boolean[];
}

/**
 * BackgroundSendEmail action
 *
 * Unbound action
 */
export class BackgroundSendEmailAction implements Executable<BackgroundSendEmailResponse> {
  constructor(public readonly query?: TypedQueryBase) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/BackgroundSendEmail`;

    const body: Record<string, unknown> = {
      Query: enumBody(this.query, "QueryBase"),
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

  async parseResponse(response: Response): Promise<BackgroundSendEmailResponse> {
    const data = await response.json();
    return data as BackgroundSendEmailResponse;
  }
}
