import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
 * AIModelPublish action
 *
 * Unbound action
 */
export class AIModelPublishAction implements Executable<AIModelPublishResponse> {
  constructor(
    public readonly modelId: string,
    public readonly modelName: string,
    public readonly source: string | undefined,
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<AIModelPublishResponse> {
    const data = await response.json();
    return data as AIModelPublishResponse;
  }
}
