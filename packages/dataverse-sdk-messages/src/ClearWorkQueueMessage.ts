import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ClearWorkQueue request message
 *
 * Web API Action: ClearWorkQueue
 */
export class ClearWorkQueueRequest
  extends OrganizationRequest
  implements Executable<ClearWorkQueueResponse>
{
  constructor(public workqueueId: string) {
    super("ClearWorkQueue");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueues(${this.workqueueId})/Microsoft.Dynamics.CRM.ClearWorkQueue`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ClearWorkQueueResponse> {
    const data = await response.json();
    return ClearWorkQueueResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.workqueueId,
    };
  }
}

/**
 * ClearWorkQueue response message
 */
export class ClearWorkQueueResponse extends OrganizationResponse {
  constructor(public result: ClearWorkQueueResponse) {
    super("ClearWorkQueue");
  }

  static fromResponse(data: unknown): ClearWorkQueueResponse {
    return new ClearWorkQueueResponse((data as any).value);
  }
}
