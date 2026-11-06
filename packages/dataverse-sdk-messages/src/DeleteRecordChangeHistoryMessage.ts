import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the DeleteRecordChangeHistory message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteRecordChangeHistoryRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * DeleteRecordChangeHistory request message
 *
 * Web API Action: DeleteRecordChangeHistory
 */
export class DeleteRecordChangeHistoryRequest
  extends OrganizationRequest
  implements Executable<DeleteRecordChangeHistoryResponse>
{
  declare readonly Parameters: Readonly<DeleteRecordChangeHistoryRequestParameters>;

  constructor(parameters: DeleteRecordChangeHistoryRequestParameters) {
    super("DeleteRecordChangeHistory", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteRecordChangeHistory`;

    const body = requestBody({
      Target: this.Parameters.Target,
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
    return DeleteRecordChangeHistoryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DeleteRecordChangeHistory action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DeleteRecordChangeHistoryResult {
  "@odata.context"?: string;
  DeletedEntriesCount: number;
}

/**
 * DeleteRecordChangeHistory response message
 *
 * `result` is the value the DeleteRecordChangeHistory action returns (see {@link DeleteRecordChangeHistoryResult}).
 */
export class DeleteRecordChangeHistoryResponse extends OrganizationResponse {
  constructor(public result: DeleteRecordChangeHistoryResult) {
    super("DeleteRecordChangeHistory");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DeleteRecordChangeHistoryResponse {
    return new DeleteRecordChangeHistoryResponse(data as DeleteRecordChangeHistoryResult);
  }
}
