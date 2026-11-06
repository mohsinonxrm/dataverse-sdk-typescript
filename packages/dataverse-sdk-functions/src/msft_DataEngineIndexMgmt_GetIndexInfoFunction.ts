import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { formatParameterAlias } from './internal/odataLiteral.js';

/**
 * Response from the msft_DataEngineIndexMgmt_GetIndexInfo function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msft_DataEngineIndexMgmt_GetIndexInfoResponse {
  "@odata.context"?: string;
  ExistsInMetaData: boolean;
  ExistsInSqlDB: boolean;
  IsQueuedForAdhocIndexing: boolean;
}

/**
 * Parameters of the msft_DataEngineIndexMgmt_GetIndexInfo function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msft_DataEngineIndexMgmt_GetIndexInfoFunctionParameters {
  GetIndexInfo_KeyColumnsJson: string;
  GetIndexInfo_LogicalTableName: string;
}

/**
 * msft_DataEngineIndexMgmt_GetIndexInfo function
 *
 * Unbound function
 */
export class msft_DataEngineIndexMgmt_GetIndexInfoFunction implements Executable<msft_DataEngineIndexMgmt_GetIndexInfoResponse> {
  constructor(
    public readonly parameters: msft_DataEngineIndexMgmt_GetIndexInfoFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msft_DataEngineIndexMgmt_GetIndexInfo`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.GetIndexInfo_KeyColumnsJson !== undefined) {
      aliases.push(`GetIndexInfo_KeyColumnsJson=@p1`);
      params.append('@p1', formatParameterAlias(this.parameters.GetIndexInfo_KeyColumnsJson, 'Edm.String'));
    }
    if (this.parameters.GetIndexInfo_LogicalTableName !== undefined) {
      aliases.push(`GetIndexInfo_LogicalTableName=@p2`);
      params.append('@p2', formatParameterAlias(this.parameters.GetIndexInfo_LogicalTableName, 'Edm.String'));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(',')})?${params.toString()}`;
    }

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<msft_DataEngineIndexMgmt_GetIndexInfoResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msft_DataEngineIndexMgmt_GetIndexInfoResponse;
  }
}
