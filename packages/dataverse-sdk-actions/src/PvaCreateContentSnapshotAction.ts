import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PvaCreateContentSnapshot action
 */
export interface PvaCreateContentSnapshotResponse {
  SnapshotId: string;
}

/**
 * PvaCreateContentSnapshot action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bot)
 */
export class PvaCreateContentSnapshotAction implements Executable<PvaCreateContentSnapshotResponse> {
  constructor(public readonly botId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaCreateContentSnapshot`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaCreateContentSnapshotResponse> {
    const data = await response.json();
    return data as PvaCreateContentSnapshotResponse;
  }
}
