import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateKBArticle action
 */
export interface msdyn_CreateKBArticleResponse {
  Response2: string;
}

/**
 * msdyn_CreateKBArticle action
 *
 * Unbound action
 */
export class msdyn_CreateKBArticleAction implements Executable<msdyn_CreateKBArticleResponse> {
  constructor(public readonly cSCopilotRequest2: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateKBArticle`;

    const body: Record<string, unknown> = {
      CSCopilotRequest2: this.cSCopilotRequest2,
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

  async parseResponse(response: Response): Promise<msdyn_CreateKBArticleResponse> {
    const data = await response.json();
    return data as msdyn_CreateKBArticleResponse;
  }
}
