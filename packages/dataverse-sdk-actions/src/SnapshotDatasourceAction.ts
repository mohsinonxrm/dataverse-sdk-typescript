import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SnapshotDatasource action
 */
export interface SnapshotDatasourceResponse {
  SnapshotReference: string;
}

/**
 * SnapshotDatasource action
 *
 * Unbound action
 */
export class SnapshotDatasourceAction implements Executable<SnapshotDatasourceResponse> {
  constructor(public readonly sourceDatalakeFolderUniqueName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SnapshotDatasource`;

    const body: Record<string, unknown> = {
      SourceDatalakeFolderUniqueName: this.sourceDatalakeFolderUniqueName,
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

  async parseResponse(response: Response): Promise<SnapshotDatasourceResponse> {
    const data = await response.json();
    return data as SnapshotDatasourceResponse;
  }
}
