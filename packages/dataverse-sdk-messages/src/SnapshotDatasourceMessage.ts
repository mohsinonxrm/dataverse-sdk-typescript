import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return SnapshotDatasourceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SnapshotDatasource action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SnapshotDatasourceResult {
  "@odata.context"?: string;
  SnapshotReference: string;
}

/**
 * SnapshotDatasource response message
 *
 * `result` is the value the SnapshotDatasource action returns (see {@link SnapshotDatasourceResult}).
 */
export class SnapshotDatasourceResponse extends OrganizationResponse {
  constructor(public result: SnapshotDatasourceResult) {
    super("SnapshotDatasource");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SnapshotDatasourceResponse {
    return new SnapshotDatasourceResponse(data as SnapshotDatasourceResult);
  }
}
