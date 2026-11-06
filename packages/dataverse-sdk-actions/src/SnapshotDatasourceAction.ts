import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the SnapshotDatasource action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SnapshotDatasourceResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as SnapshotDatasourceResponse;
  }
}
