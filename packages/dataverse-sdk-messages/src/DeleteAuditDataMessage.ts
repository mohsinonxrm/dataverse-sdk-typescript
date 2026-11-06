import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { DeleteAuditDataResponse as DeleteAuditDataResponseData } from "./types/index.js";

/**
 * Parameters of the DeleteAuditData message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteAuditDataRequestParameters {
  EndDate: string;
}

/**
 * DeleteAuditData request message
 *
 * Web API Action: DeleteAuditData
 */
export class DeleteAuditDataRequest
  extends OrganizationRequest
  implements Executable<DeleteAuditDataResponse>
{
  declare readonly Parameters: Readonly<DeleteAuditDataRequestParameters>;

  constructor(parameters: DeleteAuditDataRequestParameters) {
    super("DeleteAuditData", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteAuditData`;

    const body = requestBody({
      EndDate: this.Parameters.EndDate,
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
    // 204 No Content is an empty result
    if (response.status === 204) return DeleteAuditDataResponse.fromResponse({});
    return DeleteAuditDataResponse.fromResponse(await response.json());
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
