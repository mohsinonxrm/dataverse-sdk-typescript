import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Response from Retain action
 */
export interface RetainResponse {
  EntityCountCollection: EntityRecordCountCollection;
}

/**
 * Retain action
 *
 * Unbound action
 */
export class RetainAction implements Executable<RetainResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly operationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Retain`;

    const body: Record<string, unknown> = {
      Target: this.target,
      OperationId: this.operationId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RetainResponse> {
    const data = await response.json();
    return data as RetainResponse;
  }
}
