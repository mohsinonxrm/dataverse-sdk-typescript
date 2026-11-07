import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_InvokeGetNextSuggestion message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InvokeGetNextSuggestionRequestParameters {
  SourceContextEntity?: EntityReference | AnyEntityPayload;
  AdditionalInformation?: string;
  RunId?: string;
  AutomationLevel?: string;
  CustomAgentResponse?: string;
  Entity?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_InvokeGetNextSuggestion request message
 *
 * Web API Action: msdyn_InvokeGetNextSuggestion
 */
export class msdyn_InvokeGetNextSuggestionRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeGetNextSuggestionResponse>
{
  declare readonly Parameters: Readonly<msdyn_InvokeGetNextSuggestionRequestParameters>;

  constructor(parameters: msdyn_InvokeGetNextSuggestionRequestParameters = {}) {
    super("msdyn_InvokeGetNextSuggestion", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeGetNextSuggestion`;

    const body = requestBody({
      SourceContextEntity: this.Parameters.SourceContextEntity,
      AdditionalInformation: this.Parameters.AdditionalInformation,
      RunId: this.Parameters.RunId,
      AutomationLevel: this.Parameters.AutomationLevel,
      CustomAgentResponse: this.Parameters.CustomAgentResponse,
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

  async parseResponse(response: Response): Promise<msdyn_InvokeGetNextSuggestionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_InvokeGetNextSuggestionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_InvokeGetNextSuggestion action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InvokeGetNextSuggestionResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_InvokeGetNextSuggestion response message
 *
 * `result` is the value the msdyn_InvokeGetNextSuggestion action returns (see {@link msdyn_InvokeGetNextSuggestionResult}).
 */
export class msdyn_InvokeGetNextSuggestionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeGetNextSuggestionResult) {
    super("msdyn_InvokeGetNextSuggestion");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_InvokeGetNextSuggestionResponse {
    return new msdyn_InvokeGetNextSuggestionResponse(data as msdyn_InvokeGetNextSuggestionResult);
  }
}
