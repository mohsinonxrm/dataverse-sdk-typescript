import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Response from RollbackRetain action
 */
export interface RollbackRetainResponse {
  EntityCountCollection: EntityRecordCountCollection;
}

/**
 * RollbackRetain action
 *
 * Unbound action
 */
export class RollbackRetainAction implements Executable<RollbackRetainResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly operationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RollbackRetain`;

    const body: Record<string, unknown> = {
      Target: this.target,
      OperationId: this.operationId,
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

  async parseResponse(response: Response): Promise<RollbackRetainResponse> {
    const data = await response.json();
    return data as RollbackRetainResponse;
  }
}
