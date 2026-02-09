import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_InvokeGetNextSuggestionResponse> {
    const data = await response.json();
    return msdyn_InvokeGetNextSuggestionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Entity: this.entity,
      CustomAgentResponse: this.customAgentResponse,
      SourceContextEntity: this.sourceContextEntity,
    };
  }
}

/**
 * msdyn_InvokeGetNextSuggestion response message
 */
export class msdyn_InvokeGetNextSuggestionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InvokeGetNextSuggestionResponse) {
    super("msdyn_InvokeGetNextSuggestion");
  }

  static fromResponse(data: unknown): msdyn_InvokeGetNextSuggestionResponse {
    return new msdyn_InvokeGetNextSuggestionResponse((data as any).value);
  }
}
