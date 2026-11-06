import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from AIModelPublish action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface AIModelPublishResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the AIModelPublish action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AIModelPublishActionParameters {
  ModelId: string;
  ModelName: string;
  Source?: string;
  RunConfigurationId: string;
  TemplateId: string;
  RunConfiguration: string;
  CustomConfiguration: string;
}

/**
 * AIModelPublish action
 *
 * Unbound action
 */
export class AIModelPublishAction implements Executable<AIModelPublishResponse> {
  constructor(public readonly parameters: AIModelPublishActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AIModelPublish`;

    const body = requestBody({
      ModelId: this.parameters.ModelId,
      ModelName: this.parameters.ModelName,
      Source: this.parameters.Source,
      RunConfigurationId: this.parameters.RunConfigurationId,
      TemplateId: this.parameters.TemplateId,
      RunConfiguration: this.parameters.RunConfiguration,
      CustomConfiguration: this.parameters.CustomConfiguration,
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

  async parseResponse(response: Response): Promise<AIModelPublishResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as AIModelPublishResponse;
    return (await response.json()) as AIModelPublishResponse;
  }
}
