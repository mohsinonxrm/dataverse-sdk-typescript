import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msft_DataEngineIndexMgmt_GetIndexInfo function
 */
export interface msft_DataEngineIndexMgmt_GetIndexInfoResponse {
  ExistsInMetaData: boolean;
  ExistsInSqlDB: boolean;
  IsQueuedForAdhocIndexing: boolean;
}

/**
 * msft_DataEngineIndexMgmt_GetIndexInfo function
 *
 * Unbound function
 */
export class msft_DataEngineIndexMgmt_GetIndexInfoFunction implements Executable<msft_DataEngineIndexMgmt_GetIndexInfoResponse> {
  constructor(
    public readonly getIndexInfo_KeyColumnsJson: string,
    public readonly getIndexInfo_LogicalTableName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msft_DataEngineIndexMgmt_GetIndexInfo`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.getIndexInfo_KeyColumnsJson !== undefined) {
      aliases.push(`GetIndexInfo_KeyColumnsJson=@p1`);
      params.append(
        "@p1",
        typeof this.getIndexInfo_KeyColumnsJson === "string"
          ? `'${this.getIndexInfo_KeyColumnsJson}'`
          : String(this.getIndexInfo_KeyColumnsJson)
      );
    }
    if (this.getIndexInfo_LogicalTableName !== undefined) {
      aliases.push(`GetIndexInfo_LogicalTableName=@p2`);
      params.append(
        "@p2",
        typeof this.getIndexInfo_LogicalTableName === "string"
          ? `'${this.getIndexInfo_LogicalTableName}'`
          : String(this.getIndexInfo_LogicalTableName)
      );
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msft_DataEngineIndexMgmt_GetIndexInfoResponse> {
    const data = await response.json();
    return data as msft_DataEngineIndexMgmt_GetIndexInfoResponse;
  }
}
