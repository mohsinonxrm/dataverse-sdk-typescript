import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_InvokeGetNextSuggestionResponse as msdyn_InvokeGetNextSuggestionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_InvokeGetNextSuggestionResponse.fromResponse({});
    return msdyn_InvokeGetNextSuggestionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_InvokeGetNextSuggestion response message
 */
export class msdyn_InvokeGetNextSuggestionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeGetNextSuggestionResponseData) {
    super("msdyn_InvokeGetNextSuggestion");
  }

  static fromResponse(data: unknown): msdyn_InvokeGetNextSuggestionResponse {
    return new msdyn_InvokeGetNextSuggestionResponse(
      responseObject<msdyn_InvokeGetNextSuggestionResponseData>(data)
    );
  }
}
