import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_AIAgentAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AIAgentActionRequestParameters {
  RequestedAction: number;
  SourceForLog?: string;
  Entity: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_AIAgentAction request message
 *
 * Web API Action: msdyn_AIAgentAction
 */
export class msdyn_AIAgentActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_AIAgentActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_AIAgentActionRequestParameters>;

  constructor(parameters: msdyn_AIAgentActionRequestParameters) {
    super("msdyn_AIAgentAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AIAgentAction`;

    const body = requestBody({
      RequestedAction: this.Parameters.RequestedAction,
      SourceForLog: this.Parameters.SourceForLog,
      Entity: this.Parameters.Entity,
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

  async parseResponse(response: Response): Promise<msdyn_AIAgentActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_AIAgentActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_AIAgentAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AIAgentActionResult {
  "@odata.context"?: string;
  Outcome: string;
  Reason: string;
}

/**
 * msdyn_AIAgentAction response message
 *
 * `result` is the value the msdyn_AIAgentAction action returns (see {@link msdyn_AIAgentActionResult}).
 */
export class msdyn_AIAgentActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_AIAgentActionResult) {
    super("msdyn_AIAgentAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_AIAgentActionResponse {
    return new msdyn_AIAgentActionResponse(data as msdyn_AIAgentActionResult);
  }
}
