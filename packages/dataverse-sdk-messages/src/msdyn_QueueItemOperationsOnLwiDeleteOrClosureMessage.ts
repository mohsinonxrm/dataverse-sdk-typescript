import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_QueueItemOperationsOnLwiDeleteOrClosure request message
 *
 * Web API Action: msdyn_QueueItemOperationsOnLwiDeleteOrClosure
 */
export class msdyn_QueueItemOperationsOnLwiDeleteOrClosureRequest
  extends OrganizationRequest
  implements Executable<msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse>
{
  constructor(
    public operationType: string,
    public queueItemId: string
  ) {
    super("msdyn_QueueItemOperationsOnLwiDeleteOrClosure");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse> {
    // No return value (204 No Content)
    return new msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      OperationType: this.operationType,
      QueueItemId: this.queueItemId,
    };
  }
}

/**
 * msdyn_QueueItemOperationsOnLwiDeleteOrClosure response message
 */
export class msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_QueueItemOperationsOnLwiDeleteOrClosure");
  }

  static fromResponse(_data: unknown): msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse {
    return new msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse();
  }
}
