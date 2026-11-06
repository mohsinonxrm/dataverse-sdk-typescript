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
 *
 * The first argument is the id of the bot record to call it on.
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PvaCreateContentSnapshotResponse;
    return (await response.json()) as PvaCreateContentSnapshotResponse;
  }
}
