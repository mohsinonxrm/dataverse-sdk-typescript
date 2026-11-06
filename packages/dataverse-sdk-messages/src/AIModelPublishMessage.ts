import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";

/**
 * AIModelPublish request message
 *
 * Web API Action: AIModelPublish
 */
export class AIModelPublishRequest
  extends OrganizationRequest
  implements Executable<AIModelPublishResponse>
{
  constructor(
    public modelId: string,
    public modelName: string,
    public source: string | undefined,
    public runConfigurationId: string,
    public templateId: string,
    public runConfiguration: string,
    public customConfiguration: string
  ) {
    super("AIModelPublish");
  }

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
    return AIModelPublishResponse.fromResponse(data);
  }
}

/**
 * AIModelPublish response message
 */
export class AIModelPublishResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("AIModelPublish");
  }

  static fromResponse(data: unknown): AIModelPublishResponse {
    return new AIModelPublishResponse(responseObject<Record<string, unknown>>(data));
  }
}
