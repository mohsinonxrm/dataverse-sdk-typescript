import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CloneAttachmentsPluginAction action
 */
export interface msdyn_CloneAttachmentsPluginActionResponse {
  // No content returned
}

/**
 * msdyn_CloneAttachmentsPluginAction action
 *
 * Unbound action
 */
export class msdyn_CloneAttachmentsPluginActionAction implements Executable<msdyn_CloneAttachmentsPluginActionResponse> {
  constructor(
    public readonly sourceArticle: string,
    public readonly resultArticle: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CloneAttachmentsPluginAction`;

    const body: Record<string, unknown> = {
      SourceArticle: this.sourceArticle,
      ResultArticle: this.resultArticle,
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

  async parseResponse(response: Response): Promise<msdyn_CloneAttachmentsPluginActionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
