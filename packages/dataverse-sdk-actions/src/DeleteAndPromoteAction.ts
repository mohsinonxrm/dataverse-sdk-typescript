import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DeleteAndPromote action
 */
export interface DeleteAndPromoteResponse {
  SolutionId: string;
}

/**
 * Parameters of the DeleteAndPromote action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteAndPromoteActionParameters {
  UniqueName: string;
}

/**
 * DeleteAndPromote action
 *
 * Unbound action
 */
export class DeleteAndPromoteAction implements Executable<DeleteAndPromoteResponse> {
  constructor(public readonly parameters: DeleteAndPromoteActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAndPromote`;

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

  async parseResponse(response: Response): Promise<DeleteAndPromoteResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as DeleteAndPromoteResponse;
  }
}
