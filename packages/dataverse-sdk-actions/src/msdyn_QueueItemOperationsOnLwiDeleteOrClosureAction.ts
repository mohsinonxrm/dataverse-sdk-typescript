import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_QueueItemOperationsOnLwiDeleteOrClosure action
 */
export interface msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_QueueItemOperationsOnLwiDeleteOrClosure action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_QueueItemOperationsOnLwiDeleteOrClosureActionParameters {
  OperationType: string;
  QueueItemId: string;
}

/**
 * msdyn_QueueItemOperationsOnLwiDeleteOrClosure action
 *
 * Unbound action
 */
export class msdyn_QueueItemOperationsOnLwiDeleteOrClosureAction implements Executable<msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse> {
  constructor(
    public readonly parameters: msdyn_QueueItemOperationsOnLwiDeleteOrClosureActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QueueItemOperationsOnLwiDeleteOrClosure`;

    const body = requestBody({
      OperationType: this.parameters.OperationType,
      QueueItemId: this.parameters.QueueItemId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse;
    return (await response.json()) as msdyn_QueueItemOperationsOnLwiDeleteOrClosureResponse;
  }
}
