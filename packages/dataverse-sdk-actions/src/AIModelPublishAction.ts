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
  TemplateId: string;
  Source?: string;
  RunConfiguration: string;
  ModelId: string;
  CustomConfiguration: string;
  RunConfigurationId: string;
  ModelName: string;
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
      TemplateId: this.parameters.TemplateId,
      Source: this.parameters.Source,
      RunConfiguration: this.parameters.RunConfiguration,
      ModelId: this.parameters.ModelId,
      CustomConfiguration: this.parameters.CustomConfiguration,
      RunConfigurationId: this.parameters.RunConfigurationId,
      ModelName: this.parameters.ModelName,
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
