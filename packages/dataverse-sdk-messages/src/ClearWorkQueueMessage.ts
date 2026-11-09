import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ClearWorkQueue request message
 *
 * Web API Action: ClearWorkQueue
 *
 * The first argument is the id of the workqueue record to call it on.
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
    const url = `${baseUrl}/workqueues(${odataLiteral.guid(this.workqueueId)})/Microsoft.Dynamics.CRM.ClearWorkQueue`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ClearWorkQueueResponse> {
    // The body is the complex value, with its @odata.context
    return ClearWorkQueueResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ClearWorkQueue action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ClearWorkQueueResult {
  "@odata.context"?: string;
  isDeletionGoingAsync: boolean;
}

/**
 * ClearWorkQueue response message
 *
 * `result` is the value the ClearWorkQueue action returns (see {@link ClearWorkQueueResult}).
 */
export class ClearWorkQueueResponse extends OrganizationResponse {
  constructor(public result: ClearWorkQueueResult) {
    super("ClearWorkQueue");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ClearWorkQueueResponse {
    return new ClearWorkQueueResponse(data as ClearWorkQueueResult);
  }
}
