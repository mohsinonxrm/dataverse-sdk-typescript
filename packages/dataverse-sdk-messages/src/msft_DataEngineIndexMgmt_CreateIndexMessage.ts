import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msft_DataEngineIndexMgmt_CreateIndexResponse as msft_DataEngineIndexMgmt_CreateIndexResponseData } from "./types/index.js";

/**
 * msft_DataEngineIndexMgmt_CreateIndex request message
 *
 * Web API Action: msft_DataEngineIndexMgmt_CreateIndex
 */
export class msft_DataEngineIndexMgmt_CreateIndexRequest
  extends OrganizationRequest
  implements Executable<msft_DataEngineIndexMgmt_CreateIndexResponse>
{
  constructor(
    public createIndex_QueueAdhocRequest: boolean,
    public createIndex_KeyColumnsJson: string,
    public createIndex_LogicalTableName: string
  ) {
    super("msft_DataEngineIndexMgmt_CreateIndex");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_DataEngineIndexMgmt_CreateIndex`;

    const body: Record<string, unknown> = {
      CreateIndex_QueueAdhocRequest: this.createIndex_QueueAdhocRequest,
      CreateIndex_KeyColumnsJson: this.createIndex_KeyColumnsJson,
      CreateIndex_LogicalTableName: this.createIndex_LogicalTableName,
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

  async parseResponse(response: Response): Promise<msft_DataEngineIndexMgmt_CreateIndexResponse> {
    const data = await response.json();
    return msft_DataEngineIndexMgmt_CreateIndexResponse.fromResponse(data);
  }
}

/**
 * msft_DataEngineIndexMgmt_CreateIndex response message
 */
export class msft_DataEngineIndexMgmt_CreateIndexResponse extends OrganizationResponse {
  constructor(public result: msft_DataEngineIndexMgmt_CreateIndexResponseData) {
    super("msft_DataEngineIndexMgmt_CreateIndex");
  }

  static fromResponse(data: unknown): msft_DataEngineIndexMgmt_CreateIndexResponse {
    return new msft_DataEngineIndexMgmt_CreateIndexResponse(
      responseObject<msft_DataEngineIndexMgmt_CreateIndexResponseData>(data)
    );
  }
}
