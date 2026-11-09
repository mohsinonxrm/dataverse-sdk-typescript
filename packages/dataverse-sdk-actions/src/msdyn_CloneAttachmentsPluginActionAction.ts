import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CloneAttachmentsPluginAction action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CloneAttachmentsPluginActionResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_CloneAttachmentsPluginActionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
