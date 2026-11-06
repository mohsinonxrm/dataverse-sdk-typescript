import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the DeleteAndPromoteAsync action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DeleteAndPromoteAsyncResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as DeleteAndPromoteAsyncResponse;
  }
}
