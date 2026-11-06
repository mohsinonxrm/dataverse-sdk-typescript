import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AIModelPublish action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type AIModelPublishResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as AIModelPublishResponse;
  }
}
