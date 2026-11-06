import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DeleteAuditData action
 */
export interface DeleteAuditDataResponse {
  PartitionsDeleted: number;
}

/**
 * Parameters of the DeleteAuditData action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteAuditDataActionParameters {
  EndDate: string;
}

/**
 * DeleteAuditData action
 *
 * Unbound action
 */
export class DeleteAuditDataAction implements Executable<DeleteAuditDataResponse> {
  constructor(public readonly parameters: DeleteAuditDataActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAuditData`;

    const body = requestBody({
      EndDate: this.parameters.EndDate,
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

  async parseResponse(response: Response): Promise<DeleteAuditDataResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as DeleteAuditDataResponse;
  }
}
