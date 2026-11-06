import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_CreateAutonomousEmailWrapper message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateAutonomousEmailWrapperRequestParameters {
  SourceContextEntity?: EntityReference | AnyEntityPayload;
  Entity: EntityReference | AnyEntityPayload;
  NextSuggestion: string;
  SenderEntity?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CreateAutonomousEmailWrapper request message
 *
 * Web API Action: msdyn_CreateAutonomousEmailWrapper
 */
export class msdyn_CreateAutonomousEmailWrapperRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateAutonomousEmailWrapperResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateAutonomousEmailWrapperRequestParameters>;

  constructor(parameters: msdyn_CreateAutonomousEmailWrapperRequestParameters) {
    super("msdyn_CreateAutonomousEmailWrapper", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAutonomousEmailWrapper`;

    const body = requestBody({
      SourceContextEntity: this.Parameters.SourceContextEntity,
      Entity: this.Parameters.Entity,
      NextSuggestion: this.Parameters.NextSuggestion,
      SenderEntity: this.Parameters.SenderEntity,
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

  async parseResponse(response: Response): Promise<msdyn_CreateAutonomousEmailWrapperResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CreateAutonomousEmailWrapperResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateAutonomousEmailWrapper action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateAutonomousEmailWrapperResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_CreateAutonomousEmailWrapper response message
 *
 * `result` is the value the msdyn_CreateAutonomousEmailWrapper action returns (see {@link msdyn_CreateAutonomousEmailWrapperResult}).
 */
export class msdyn_CreateAutonomousEmailWrapperResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateAutonomousEmailWrapperResult) {
    super("msdyn_CreateAutonomousEmailWrapper");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateAutonomousEmailWrapperResponse {
    return new msdyn_CreateAutonomousEmailWrapperResponse(
      data as msdyn_CreateAutonomousEmailWrapperResult
    );
  }
}
