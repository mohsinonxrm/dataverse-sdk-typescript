import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaCreateContentSnapshot request message
 *
 * Web API Action: PvaCreateContentSnapshot
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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaCreateContentSnapshotResponse> {
    const data = await response.json();
    return PvaCreateContentSnapshotResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.botId,
    };
  }
}

/**
 * PvaCreateContentSnapshot response message
 */
export class PvaCreateContentSnapshotResponse extends OrganizationResponse {
  constructor(public result: PvaCreateContentSnapshotResponse) {
    super("PvaCreateContentSnapshot");
  }

  static fromResponse(data: unknown): PvaCreateContentSnapshotResponse {
    return new PvaCreateContentSnapshotResponse((data as any).value);
  }
}
