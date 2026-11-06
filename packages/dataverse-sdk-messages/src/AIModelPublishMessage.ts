import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AIModelPublish message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AIModelPublishRequestParameters {
  ModelId: string;
  ModelName: string;
  Source?: string;
  RunConfigurationId: string;
  TemplateId: string;
  RunConfiguration: string;
  CustomConfiguration: string;
}

/**
 * AIModelPublish request message
 *
 * Web API Action: AIModelPublish
 */
export class AIModelPublishRequest
  extends OrganizationRequest
  implements Executable<AIModelPublishResponse>
{
  declare readonly Parameters: Readonly<AIModelPublishRequestParameters>;

  constructor(parameters: AIModelPublishRequestParameters) {
    super("AIModelPublish", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AIModelPublish`;

    const body = requestBody({
      ModelId: this.Parameters.ModelId,
      ModelName: this.Parameters.ModelName,
      Source: this.Parameters.Source,
      RunConfigurationId: this.Parameters.RunConfigurationId,
      TemplateId: this.Parameters.TemplateId,
      RunConfiguration: this.Parameters.RunConfiguration,
      CustomConfiguration: this.Parameters.CustomConfiguration,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return AIModelPublishResponse.fromResponse(text ? JSON.parse(text) : {});
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
