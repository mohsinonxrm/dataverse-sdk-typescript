import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the DeleteRecordChangeHistory action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DeleteRecordChangeHistoryResponse {
  "@odata.context"?: string;
  DeletedEntriesCount: number;
}

/**
 * Parameters of the DeleteRecordChangeHistory action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteRecordChangeHistoryActionParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * DeleteRecordChangeHistory action
 *
 * Unbound action
 */
export class DeleteRecordChangeHistoryAction implements Executable<DeleteRecordChangeHistoryResponse> {
  constructor(public readonly parameters: DeleteRecordChangeHistoryActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteRecordChangeHistory`;

    const body = requestBody({
      Target: this.parameters.Target,
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

  async parseResponse(response: Response): Promise<DeleteRecordChangeHistoryResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as DeleteRecordChangeHistoryResponse;
  }
}
