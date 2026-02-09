import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrieveKnowledgeSearchModifiers action
 */
export interface msdyn_RetrieveKnowledgeSearchModifiersResponse {
  Result: string;
}

/**
 * msdyn_RetrieveKnowledgeSearchModifiers action
 *
 * Unbound action
 */
export class msdyn_RetrieveKnowledgeSearchModifiersAction implements Executable<msdyn_RetrieveKnowledgeSearchModifiersResponse> {
  constructor(public readonly runtimeMode: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKnowledgeSearchModifiers`;

    const body: Record<string, unknown> = {
      RuntimeMode: this.runtimeMode,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKnowledgeSearchModifiersResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveKnowledgeSearchModifiersResponse;
  }
}
