import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_ProcessInvokeCaseProcessingAgentRequest message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProcessInvokeCaseProcessingAgentRequestRequestParameters {
  ExtraParams?: string;
  Entity: EntityReference | AnyEntityPayload;
  Actions?: string;
}

/**
 * msdyn_ProcessInvokeCaseProcessingAgentRequest request message
 *
 * Web API Action: msdyn_ProcessInvokeCaseProcessingAgentRequest
 */
export class msdyn_ProcessInvokeCaseProcessingAgentRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProcessInvokeCaseProcessingAgentRequestResponse>
{
  declare readonly Parameters: Readonly<msdyn_ProcessInvokeCaseProcessingAgentRequestRequestParameters>;

  constructor(parameters: msdyn_ProcessInvokeCaseProcessingAgentRequestRequestParameters) {
    super("msdyn_ProcessInvokeCaseProcessingAgentRequest", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProcessInvokeCaseProcessingAgentRequest`;

    const body = requestBody({
      ExtraParams: this.Parameters.ExtraParams,
      Entity: this.Parameters.Entity,
      Actions: this.Parameters.Actions,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_ProcessInvokeCaseProcessingAgentRequestResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ProcessInvokeCaseProcessingAgentRequestResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_ProcessInvokeCaseProcessingAgentRequest action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProcessInvokeCaseProcessingAgentRequestResult {
  "@odata.context"?: string;
  IsDisabled: boolean;
  IsError: boolean;
  Message: string;
  ProcessedActions: string;
  ProcessedExtraParams: string;
}

/**
 * msdyn_ProcessInvokeCaseProcessingAgentRequest response message
 *
 * `result` is the value the msdyn_ProcessInvokeCaseProcessingAgentRequest action returns (see {@link msdyn_ProcessInvokeCaseProcessingAgentRequestResult}).
 */
export class msdyn_ProcessInvokeCaseProcessingAgentRequestResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProcessInvokeCaseProcessingAgentRequestResult) {
    super("msdyn_ProcessInvokeCaseProcessingAgentRequest");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ProcessInvokeCaseProcessingAgentRequestResponse {
    return new msdyn_ProcessInvokeCaseProcessingAgentRequestResponse(
      data as msdyn_ProcessInvokeCaseProcessingAgentRequestResult
    );
  }
}
