import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CloneAttachmentsPluginAction action
 */
export interface msdyn_CloneAttachmentsPluginActionResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_CloneAttachmentsPluginAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CloneAttachmentsPluginActionActionParameters {
  SourceArticle: string;
  ResultArticle: string;
}

/**
 * msdyn_CloneAttachmentsPluginAction action
 *
 * Unbound action
 */
export class msdyn_CloneAttachmentsPluginActionAction implements Executable<msdyn_CloneAttachmentsPluginActionResponse> {
  constructor(public readonly parameters: msdyn_CloneAttachmentsPluginActionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CloneAttachmentsPluginAction`;

    const body = requestBody({
      SourceArticle: this.parameters.SourceArticle,
      ResultArticle: this.parameters.ResultArticle,
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

  async parseResponse(response: Response): Promise<msdyn_CloneAttachmentsPluginActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CloneAttachmentsPluginActionResponse;
  }
}
