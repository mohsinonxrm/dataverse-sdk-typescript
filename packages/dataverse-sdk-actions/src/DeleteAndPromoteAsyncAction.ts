import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DeleteAndPromoteAsync action
 */
export interface DeleteAndPromoteAsyncResponse {
  AsyncOperationId: string;
}

/**
 * Parameters of the DeleteAndPromoteAsync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteAndPromoteAsyncActionParameters {
  UniqueName: string;
}

/**
 * DeleteAndPromoteAsync action
 *
 * Unbound action
 */
export class DeleteAndPromoteAsyncAction implements Executable<DeleteAndPromoteAsyncResponse> {
  constructor(public readonly parameters: DeleteAndPromoteAsyncActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAndPromoteAsync`;

    const body = requestBody({
      UniqueName: this.parameters.UniqueName,
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

  async parseResponse(response: Response): Promise<DeleteAndPromoteAsyncResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as DeleteAndPromoteAsyncResponse;
    return (await response.json()) as DeleteAndPromoteAsyncResponse;
  }
}
