import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_RetrieveKnowledgeSearchModifiers request message
 *
 * Web API Action: msdyn_RetrieveKnowledgeSearchModifiers
 */
export class msdyn_RetrieveKnowledgeSearchModifiersRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveKnowledgeSearchModifiersResponse>
{
  constructor(public runtimeMode: string) {
    super("msdyn_RetrieveKnowledgeSearchModifiers");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKnowledgeSearchModifiers`;

    const body: Record<string, unknown> = {
      RuntimeMode: this.runtimeMode,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKnowledgeSearchModifiersResponse> {
    const data = await response.json();
    return msdyn_RetrieveKnowledgeSearchModifiersResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RuntimeMode: this.runtimeMode,
    };
  }
}

/**
 * msdyn_RetrieveKnowledgeSearchModifiers response message
 */
export class msdyn_RetrieveKnowledgeSearchModifiersResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveKnowledgeSearchModifiersResponse) {
    super("msdyn_RetrieveKnowledgeSearchModifiers");
  }

  static fromResponse(data: unknown): msdyn_RetrieveKnowledgeSearchModifiersResponse {
    return new msdyn_RetrieveKnowledgeSearchModifiersResponse((data as any).value);
  }
}
