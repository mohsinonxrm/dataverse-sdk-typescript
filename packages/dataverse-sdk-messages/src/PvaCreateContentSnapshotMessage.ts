import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaCreateContentSnapshot request message
 *
 * Web API Action: PvaCreateContentSnapshot
 *
 * The first argument is the id of the bot record to call it on.
 */
export class PvaCreateContentSnapshotRequest
  extends OrganizationRequest
  implements Executable<PvaCreateContentSnapshotResponse>
{
  constructor(public botId: string) {
    super("PvaCreateContentSnapshot");
  }

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
    // The body is the complex value, with its @odata.context
    return PvaCreateContentSnapshotResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PvaCreateContentSnapshot action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PvaCreateContentSnapshotResult {
  "@odata.context"?: string;
  SnapshotId: string;
}

/**
 * PvaCreateContentSnapshot response message
 *
 * `result` is the value the PvaCreateContentSnapshot action returns (see {@link PvaCreateContentSnapshotResult}).
 */
export class PvaCreateContentSnapshotResponse extends OrganizationResponse {
  constructor(public result: PvaCreateContentSnapshotResult) {
    super("PvaCreateContentSnapshot");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PvaCreateContentSnapshotResponse {
    return new PvaCreateContentSnapshotResponse(data as PvaCreateContentSnapshotResult);
  }
}
