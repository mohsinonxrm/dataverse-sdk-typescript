import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the msft_DataEngineIndexMgmt_GetIndexInfo message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msft_DataEngineIndexMgmt_GetIndexInfoRequestParameters {
  GetIndexInfo_KeyColumnsJson: string;
  GetIndexInfo_LogicalTableName: string;
}

/**
 * msft_DataEngineIndexMgmt_GetIndexInfo request message
 *
 * Web API Function: msft_DataEngineIndexMgmt_GetIndexInfo
 */
export class msft_DataEngineIndexMgmt_GetIndexInfoRequest
  extends OrganizationRequest
  implements Executable<msft_DataEngineIndexMgmt_GetIndexInfoResponse>
{
  declare readonly Parameters: Readonly<msft_DataEngineIndexMgmt_GetIndexInfoRequestParameters>;

  constructor(parameters: msft_DataEngineIndexMgmt_GetIndexInfoRequestParameters) {
    super("msft_DataEngineIndexMgmt_GetIndexInfo", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msft_DataEngineIndexMgmt_GetIndexInfo`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.GetIndexInfo_KeyColumnsJson !== undefined) {
      aliases.push(`GetIndexInfo_KeyColumnsJson=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.GetIndexInfo_KeyColumnsJson, "Edm.String")
      );
    }
    if (this.Parameters.GetIndexInfo_LogicalTableName !== undefined) {
      aliases.push(`GetIndexInfo_LogicalTableName=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.Parameters.GetIndexInfo_LogicalTableName, "Edm.String")
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
    // The body is the complex value, with its @odata.context
    return msft_DataEngineIndexMgmt_GetIndexInfoResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msft_DataEngineIndexMgmt_GetIndexInfo function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msft_DataEngineIndexMgmt_GetIndexInfoResult {
  "@odata.context"?: string;
  ExistsInMetaData: boolean;
  ExistsInSqlDB: boolean;
  IsQueuedForAdhocIndexing: boolean;
}

/**
 * msft_DataEngineIndexMgmt_GetIndexInfo response message
 *
 * `result` is the value the msft_DataEngineIndexMgmt_GetIndexInfo function returns (see {@link msft_DataEngineIndexMgmt_GetIndexInfoResult}).
 */
export class msft_DataEngineIndexMgmt_GetIndexInfoResponse extends OrganizationResponse {
  constructor(public result: msft_DataEngineIndexMgmt_GetIndexInfoResult) {
    super("msft_DataEngineIndexMgmt_GetIndexInfo");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msft_DataEngineIndexMgmt_GetIndexInfoResponse {
    return new msft_DataEngineIndexMgmt_GetIndexInfoResponse(
      data as msft_DataEngineIndexMgmt_GetIndexInfoResult
    );
  }
}
