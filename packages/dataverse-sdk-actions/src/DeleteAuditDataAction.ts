import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the DeleteAuditData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DeleteAuditDataResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as DeleteAuditDataResponse;
  }
}
