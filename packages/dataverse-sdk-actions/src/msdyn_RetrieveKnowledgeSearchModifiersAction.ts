import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RetrieveKnowledgeSearchModifiers action
 */
export interface msdyn_RetrieveKnowledgeSearchModifiersResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_RetrieveKnowledgeSearchModifiers action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKnowledgeSearchModifiersActionParameters {
  RuntimeMode?: string;
}

/**
 * msdyn_RetrieveKnowledgeSearchModifiers action
 *
 * Unbound action
 */
export class msdyn_RetrieveKnowledgeSearchModifiersAction implements Executable<msdyn_RetrieveKnowledgeSearchModifiersResponse> {
  constructor(
    public readonly parameters: msdyn_RetrieveKnowledgeSearchModifiersActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKnowledgeSearchModifiers`;

    const body = requestBody({
      RuntimeMode: this.parameters.RuntimeMode,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKnowledgeSearchModifiersResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RetrieveKnowledgeSearchModifiersResponse;
    return (await response.json()) as msdyn_RetrieveKnowledgeSearchModifiersResponse;
  }
}
