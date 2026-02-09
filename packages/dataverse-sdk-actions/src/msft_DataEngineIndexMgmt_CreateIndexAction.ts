import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msft_DataEngineIndexMgmt_CreateIndex action
 */
export interface msft_DataEngineIndexMgmt_CreateIndexResponse {
  CreateIndex_CreateResult: boolean;
}

/**
 * msft_DataEngineIndexMgmt_CreateIndex action
 *
 * Unbound action
 */
export class msft_DataEngineIndexMgmt_CreateIndexAction implements Executable<msft_DataEngineIndexMgmt_CreateIndexResponse> {
  constructor(
    public readonly createIndex_QueueAdhocRequest: boolean,
    public readonly createIndex_KeyColumnsJson: string,
    public readonly createIndex_LogicalTableName: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msft_DataEngineIndexMgmt_CreateIndexResponse> {
    const data = await response.json();
    return data as msft_DataEngineIndexMgmt_CreateIndexResponse;
  }
}
