import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { PvaCreateContentSnapshotResponse as PvaCreateContentSnapshotResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return PvaCreateContentSnapshotResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * PvaCreateContentSnapshot response message
 */
export class PvaCreateContentSnapshotResponse extends OrganizationResponse {
  constructor(public result: PvaCreateContentSnapshotResponseData) {
    super("PvaCreateContentSnapshot");
  }

  static fromResponse(data: unknown): PvaCreateContentSnapshotResponse {
    return new PvaCreateContentSnapshotResponse(
      responseObject<PvaCreateContentSnapshotResponseData>(data)
    );
  }
}
