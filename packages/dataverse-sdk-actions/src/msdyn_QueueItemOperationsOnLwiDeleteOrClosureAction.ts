import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_QueueItemOperationsOnLwiDeleteOrClosure action
 */
export interface msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse {
  // No content returned
}

/**
 * msdyn_QueueItemOperationsOnLwiDeleteOrClosure action
 *
 * Unbound action
 */
export class msdyn_QueueItemOperationsOnLwiDeleteOrClosureAction implements Executable<msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse> {
  constructor(
    public readonly operationType: string,
    public readonly queueItemId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QueueItemOperationsOnLwiDeleteOrClosure`;

    const body: Record<string, unknown> = {
      OperationType: this.operationType,
      QueueItemId: this.queueItemId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse> {
    // No return value (204 No Content)
    return {};
  }
}
