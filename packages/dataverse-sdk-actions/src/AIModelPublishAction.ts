import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from AIModelPublish action
 */
export interface AIModelPublishResponse {
  value: EntityReference;
}

/**
 * AIModelPublish action
 *
 * Unbound action
 */
export class AIModelPublishAction implements Executable<AIModelPublishResponse> {
  constructor(
    public readonly modelId: string,
    public readonly modelName: string,
    public readonly source: string,
    public readonly runConfigurationId: string,
    public readonly templateId: string,
    public readonly runConfiguration: string,
    public readonly customConfiguration: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AIModelPublish`;

    const body: Record<string, unknown> = {
      ModelId: this.modelId,
      ModelName: this.modelName,
      Source: this.source,
      RunConfigurationId: this.runConfigurationId,
      TemplateId: this.templateId,
      RunConfiguration: this.runConfiguration,
      CustomConfiguration: this.customConfiguration,
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

  async parseResponse(response: Response): Promise<AIModelPublishResponse> {
    const data = await response.json();
    return data as AIModelPublishResponse;
  }
}
