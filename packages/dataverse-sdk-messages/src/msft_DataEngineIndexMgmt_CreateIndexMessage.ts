import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msft_DataEngineIndexMgmt_CreateIndex message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msft_DataEngineIndexMgmt_CreateIndexRequestParameters {
  CreateIndex_QueueAdhocRequest: boolean;
  CreateIndex_KeyColumnsJson: string;
  CreateIndex_LogicalTableName: string;
}

/**
 * msft_DataEngineIndexMgmt_CreateIndex request message
 *
 * Web API Action: msft_DataEngineIndexMgmt_CreateIndex
 */
export class msft_DataEngineIndexMgmt_CreateIndexRequest
  extends OrganizationRequest
  implements Executable<msft_DataEngineIndexMgmt_CreateIndexResponse>
{
  declare readonly Parameters: Readonly<msft_DataEngineIndexMgmt_CreateIndexRequestParameters>;

  constructor(parameters: msft_DataEngineIndexMgmt_CreateIndexRequestParameters) {
    super("msft_DataEngineIndexMgmt_CreateIndex", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_DataEngineIndexMgmt_CreateIndex`;

    const body = requestBody({
      CreateIndex_QueueAdhocRequest: this.Parameters.CreateIndex_QueueAdhocRequest,
      CreateIndex_KeyColumnsJson: this.Parameters.CreateIndex_KeyColumnsJson,
      CreateIndex_LogicalTableName: this.Parameters.CreateIndex_LogicalTableName,
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

  async parseResponse(response: Response): Promise<msft_DataEngineIndexMgmt_CreateIndexResponse> {
    // The body is the complex value, with its @odata.context
    return msft_DataEngineIndexMgmt_CreateIndexResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msft_DataEngineIndexMgmt_CreateIndex action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msft_DataEngineIndexMgmt_CreateIndexResult {
  "@odata.context"?: string;
  CreateIndex_CreateResult: boolean;
}

/**
 * msft_DataEngineIndexMgmt_CreateIndex response message
 *
 * `result` is the value the msft_DataEngineIndexMgmt_CreateIndex action returns (see {@link msft_DataEngineIndexMgmt_CreateIndexResult}).
 */
export class msft_DataEngineIndexMgmt_CreateIndexResponse extends OrganizationResponse {
  constructor(public result: msft_DataEngineIndexMgmt_CreateIndexResult) {
    super("msft_DataEngineIndexMgmt_CreateIndex");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msft_DataEngineIndexMgmt_CreateIndexResponse {
    return new msft_DataEngineIndexMgmt_CreateIndexResponse(
      data as msft_DataEngineIndexMgmt_CreateIndexResult
    );
  }
}
