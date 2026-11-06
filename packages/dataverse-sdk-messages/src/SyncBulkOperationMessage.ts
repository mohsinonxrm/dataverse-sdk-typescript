import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import { enumBody } from "./internal/enumBody.js";
import type {
  QueryExpression,
  SyncBulkOperationResponse as SyncBulkOperationResponseData,
} from "./types/index.js";

/**
 * Parameters of the SyncBulkOperation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SyncBulkOperationRequestParameters {
  QuerySet?: QueryExpression[];
  OperationType: number;
}

/**
 * SyncBulkOperation request message
 *
 * Web API Action: SyncBulkOperation
 */
export class SyncBulkOperationRequest
  extends OrganizationRequest
  implements Executable<SyncBulkOperationResponse>
{
  declare readonly Parameters: Readonly<SyncBulkOperationRequestParameters>;

  constructor(parameters: SyncBulkOperationRequestParameters) {
    super("SyncBulkOperation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SyncBulkOperation`;

    const body = requestBody({
      QuerySet: enumBody(this.Parameters.QuerySet, "QueryExpression"),
      OperationType: this.Parameters.OperationType,
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

  async parseResponse(response: Response): Promise<SyncBulkOperationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return SyncBulkOperationResponse.fromResponse({});
    return SyncBulkOperationResponse.fromResponse(await response.json());
  }
}

/**
 * SyncBulkOperation response message
 */
export class SyncBulkOperationResponse extends OrganizationResponse {
  constructor(public result: SyncBulkOperationResponseData) {
    super("SyncBulkOperation");
  }

  static fromResponse(data: unknown): SyncBulkOperationResponse {
    return new SyncBulkOperationResponse(responseObject<SyncBulkOperationResponseData>(data));
  }
}
