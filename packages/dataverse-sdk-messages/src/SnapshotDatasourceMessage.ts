import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { SnapshotDatasourceResponse as SnapshotDatasourceResponseData } from "./types/index.js";

/**
 * SnapshotDatasource request message
 *
 * Web API Action: SnapshotDatasource
 */
export class SnapshotDatasourceRequest
  extends OrganizationRequest
  implements Executable<SnapshotDatasourceResponse>
{
  constructor(public sourceDatalakeFolderUniqueName: string) {
    super("SnapshotDatasource");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SnapshotDatasource`;

    const body: Record<string, unknown> = {
      SourceDatalakeFolderUniqueName: this.sourceDatalakeFolderUniqueName,
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

  async parseResponse(response: Response): Promise<SnapshotDatasourceResponse> {
    const data = await response.json();
    return SnapshotDatasourceResponse.fromResponse(data);
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
