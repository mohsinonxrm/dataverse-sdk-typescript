import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * DeleteRecordChangeHistory request message
 *
 * Web API Action: DeleteRecordChangeHistory
 */
export class DeleteRecordChangeHistoryRequest
  extends OrganizationRequest
  implements Executable<DeleteRecordChangeHistoryResponse>
{
  constructor(public target: EntityReference) {
    super("DeleteRecordChangeHistory");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteRecordChangeHistory`;

    const body: Record<string, unknown> = {
      Target: this.target,
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

  async parseResponse(response: Response): Promise<DeleteRecordChangeHistoryResponse> {
    const data = await response.json();
    return DeleteRecordChangeHistoryResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
    };
  }
}

/**
 * DeleteRecordChangeHistory response message
 */
export class DeleteRecordChangeHistoryResponse extends OrganizationResponse {
  constructor(public result: DeleteRecordChangeHistoryResponse) {
    super("DeleteRecordChangeHistory");
  }

  static fromResponse(data: unknown): DeleteRecordChangeHistoryResponse {
    return new DeleteRecordChangeHistoryResponse((data as any).value);
  }
}
