import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Parameters of the RollbackRetain message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RollbackRetainRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  OperationId?: string;
}

/**
 * RollbackRetain request message
 *
 * Web API Action: RollbackRetain
 */
export class RollbackRetainRequest
  extends OrganizationRequest
  implements Executable<RollbackRetainResponse>
{
  declare readonly Parameters: Readonly<RollbackRetainRequestParameters>;

  constructor(parameters: RollbackRetainRequestParameters) {
    super("RollbackRetain", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RollbackRetain`;

    const body = requestBody({
      Target: this.Parameters.Target,
      OperationId: this.Parameters.OperationId,
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

  async parseResponse(response: Response): Promise<RollbackRetainResponse> {
    // The body is the complex value, with its @odata.context
    return RollbackRetainResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RollbackRetain action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RollbackRetainResult {
  "@odata.context"?: string;
  EntityCountCollection: EntityRecordCountCollection;
}

/**
 * RollbackRetain response message
 *
 * `result` is the value the RollbackRetain action returns (see {@link RollbackRetainResult}).
 */
export class RollbackRetainResponse extends OrganizationResponse {
  constructor(public result: RollbackRetainResult) {
    super("RollbackRetain");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RollbackRetainResponse {
    return new RollbackRetainResponse(data as RollbackRetainResult);
  }
}
