import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { DeleteRecordChangeHistoryResponse as DeleteRecordChangeHistoryResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return DeleteRecordChangeHistoryResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * DeleteRecordChangeHistory response message
 */
export class DeleteRecordChangeHistoryResponse extends OrganizationResponse {
  constructor(public result: DeleteRecordChangeHistoryResponseData) {
    super("DeleteRecordChangeHistory");
  }

  static fromResponse(data: unknown): DeleteRecordChangeHistoryResponse {
    return new DeleteRecordChangeHistoryResponse(
      responseObject<DeleteRecordChangeHistoryResponseData>(data)
    );
  }
}
