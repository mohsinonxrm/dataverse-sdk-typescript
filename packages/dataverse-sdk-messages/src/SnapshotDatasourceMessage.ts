import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { SnapshotDatasourceResponse as SnapshotDatasourceResponseData } from "./types/index.js";

/**
 * Parameters of the SnapshotDatasource message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SnapshotDatasourceRequestParameters {
  SourceDatalakeFolderUniqueName: string;
}

/**
 * SnapshotDatasource request message
 *
 * Web API Action: SnapshotDatasource
 */
export class SnapshotDatasourceRequest
  extends OrganizationRequest
  implements Executable<SnapshotDatasourceResponse>
{
  declare readonly Parameters: Readonly<SnapshotDatasourceRequestParameters>;

  constructor(parameters: SnapshotDatasourceRequestParameters) {
    super("SnapshotDatasource", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SnapshotDatasource`;

    const body = requestBody({
      SourceDatalakeFolderUniqueName: this.Parameters.SourceDatalakeFolderUniqueName,
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

  async parseResponse(response: Response): Promise<SnapshotDatasourceResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return SnapshotDatasourceResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * SnapshotDatasource response message
 */
export class SnapshotDatasourceResponse extends OrganizationResponse {
  constructor(public result: SnapshotDatasourceResponseData) {
    super("SnapshotDatasource");
  }

  static fromResponse(data: unknown): SnapshotDatasourceResponse {
    return new SnapshotDatasourceResponse(responseObject<SnapshotDatasourceResponseData>(data));
  }
}
