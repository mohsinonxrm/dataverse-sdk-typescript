import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_InvokeGetNextSuggestionResponse as msdyn_InvokeGetNextSuggestionResponseData } from "./types/index.js";

/**
 * msdyn_InvokeGetNextSuggestion request message
 *
 * Web API Action: msdyn_InvokeGetNextSuggestion
 */
export class msdyn_InvokeGetNextSuggestionRequest
  extends OrganizationRequest
  implements Executable<msdyn_InvokeGetNextSuggestionResponse>
{
  constructor(
    public entity: EntityReference,
    public customAgentResponse: string,
    public sourceContextEntity: EntityReference
  ) {
    super("msdyn_InvokeGetNextSuggestion");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InvokeGetNextSuggestion`;

    const body: Record<string, unknown> = {
      Entity: this.entity,
      CustomAgentResponse: this.customAgentResponse,
      SourceContextEntity: this.sourceContextEntity,
    };

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
    const data = await response.json();
    return msdyn_InvokeGetNextSuggestionResponse.fromResponse(data);
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
