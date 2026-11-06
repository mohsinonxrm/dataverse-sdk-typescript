import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msft_DataEngineIndexMgmt_CreateIndexResponse as msft_DataEngineIndexMgmt_CreateIndexResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msft_DataEngineIndexMgmt_CreateIndexResponse.fromResponse(text ? JSON.parse(text) : {});
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
