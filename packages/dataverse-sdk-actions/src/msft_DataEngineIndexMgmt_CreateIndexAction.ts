import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msft_DataEngineIndexMgmt_CreateIndex action
 */
export interface msft_DataEngineIndexMgmt_CreateIndexResponse {
  CreateIndex_CreateResult: boolean;
}

/**
 * Parameters of the msft_DataEngineIndexMgmt_CreateIndex action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msft_DataEngineIndexMgmt_CreateIndexActionParameters {
  CreateIndex_QueueAdhocRequest: boolean;
  CreateIndex_KeyColumnsJson: string;
  CreateIndex_LogicalTableName: string;
}

/**
 * msft_DataEngineIndexMgmt_CreateIndex action
 *
 * Unbound action
 */
export class msft_DataEngineIndexMgmt_CreateIndexAction implements Executable<msft_DataEngineIndexMgmt_CreateIndexResponse> {
  constructor(public readonly parameters: msft_DataEngineIndexMgmt_CreateIndexActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msft_DataEngineIndexMgmt_CreateIndex`;

    const body = requestBody({
      CreateIndex_QueueAdhocRequest: this.parameters.CreateIndex_QueueAdhocRequest,
      CreateIndex_KeyColumnsJson: this.parameters.CreateIndex_KeyColumnsJson,
      CreateIndex_LogicalTableName: this.parameters.CreateIndex_LogicalTableName,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msft_DataEngineIndexMgmt_CreateIndexResponse;
    return (await response.json()) as msft_DataEngineIndexMgmt_CreateIndexResponse;
  }
}
