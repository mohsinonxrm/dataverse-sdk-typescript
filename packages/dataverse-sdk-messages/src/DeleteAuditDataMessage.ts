import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return DeleteAuditDataResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the DeleteAuditData action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface DeleteAuditDataResult {
  "@odata.context"?: string;
  PartitionsDeleted: number;
}

/**
 * DeleteAuditData response message
 *
 * `result` is the value the DeleteAuditData action returns (see {@link DeleteAuditDataResult}).
 */
export class DeleteAuditDataResponse extends OrganizationResponse {
  constructor(public result: DeleteAuditDataResult) {
    super("DeleteAuditData");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DeleteAuditDataResponse {
    return new DeleteAuditDataResponse(data as DeleteAuditDataResult);
  }
}
