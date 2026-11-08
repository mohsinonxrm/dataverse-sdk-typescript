import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the PvaCreateContentSnapshot action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PvaCreateContentSnapshotResponse {
  "@odata.context"?: string;
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
    const url = `${baseUrl}/bots(${odataLiteral.guid(this.botId)})/Microsoft.Dynamics.CRM.PvaCreateContentSnapshot`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaCreateContentSnapshotResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as PvaCreateContentSnapshotResponse;
  }
}
