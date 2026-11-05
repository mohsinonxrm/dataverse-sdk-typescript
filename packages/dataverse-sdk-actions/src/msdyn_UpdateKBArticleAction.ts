import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateKBArticle action
 */
export interface msdyn_UpdateKBArticleResponse {
  Response3: string;
}

/**
 * msdyn_UpdateKBArticle action
 *
 * Unbound action
 */
export class msdyn_UpdateKBArticleAction implements Executable<msdyn_UpdateKBArticleResponse> {
  constructor(
    public readonly doesKBExistResponse3: string,
    public readonly cSCopilotRequest3: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateKBArticle`;

    const body: Record<string, unknown> = {
      DoesKBExistResponse3: this.doesKBExistResponse3,
      CSCopilotRequest3: this.cSCopilotRequest3,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateKBArticleResponse> {
    const data = await response.json();
    return data as msdyn_UpdateKBArticleResponse;
  }
}
