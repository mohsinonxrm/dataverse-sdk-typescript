import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from SnapshotDatasource action
 */
export interface SnapshotDatasourceResponse {
  SnapshotReference: string;
}

/**
 * Parameters of the SnapshotDatasource action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SnapshotDatasourceActionParameters {
  SourceDatalakeFolderUniqueName: string;
}

/**
 * SnapshotDatasource action
 *
 * Unbound action
 */
export class SnapshotDatasourceAction implements Executable<SnapshotDatasourceResponse> {
  constructor(public readonly parameters: SnapshotDatasourceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SnapshotDatasource`;

    const body = requestBody({
      SourceDatalakeFolderUniqueName: this.parameters.SourceDatalakeFolderUniqueName,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as SnapshotDatasourceResponse;
    return (await response.json()) as SnapshotDatasourceResponse;
  }
}
