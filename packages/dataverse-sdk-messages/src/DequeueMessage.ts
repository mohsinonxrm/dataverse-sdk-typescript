import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the Dequeue message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DequeueRequestParameters {
  request?: string;
}

/**
 * Dequeue request message
 *
 * Web API Action: Dequeue
 *
 * The first argument is the id of the workqueue record to call it on.
 */
export class DequeueRequest extends OrganizationRequest implements Executable<DequeueResponse> {
  declare readonly Parameters: Readonly<DequeueRequestParameters>;

  constructor(
    public workqueueId: string,
    parameters: DequeueRequestParameters = {}
  ) {
    super("Dequeue", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workqueues(${odataLiteral.guid(this.workqueueId)})/Microsoft.Dynamics.CRM.Dequeue`;

    const body = requestBody({
      request: this.Parameters.request,
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

  async parseResponse(response: Response): Promise<DequeueResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return DequeueResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return DequeueResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the Dequeue action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type DequeueResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * Dequeue response message
 *
 * `result` is the value the Dequeue action returns (see {@link DequeueResult}).
 */
export class DequeueResponse extends OrganizationResponse {
  constructor(public result: DequeueResult) {
    super("Dequeue");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): DequeueResponse {
    return new DequeueResponse((data ?? null) as DequeueResult);
  }
}
