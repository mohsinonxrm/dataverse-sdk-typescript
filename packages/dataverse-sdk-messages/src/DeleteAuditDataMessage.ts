import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { DeleteAuditDataResponse as DeleteAuditDataResponseData } from "./types/index.js";

/**
 * DeleteAuditData request message
 *
 * Web API Action: DeleteAuditData
 */
export class DeleteAuditDataRequest
  extends OrganizationRequest
  implements Executable<DeleteAuditDataResponse>
{
  constructor(public endDate: string) {
    super("DeleteAuditData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAuditData`;

    const body: Record<string, unknown> = {
      EndDate: this.endDate,
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

  async parseResponse(response: Response): Promise<DeleteAuditDataResponse> {
    const data = await response.json();
    return DeleteAuditDataResponse.fromResponse(data);
  }
}

/**
 * DeleteAuditData response message
 */
export class DeleteAuditDataResponse extends OrganizationResponse {
  constructor(public result: DeleteAuditDataResponseData) {
    super("DeleteAuditData");
  }

  static fromResponse(data: unknown): DeleteAuditDataResponse {
    return new DeleteAuditDataResponse(responseObject<DeleteAuditDataResponseData>(data));
  }
}
