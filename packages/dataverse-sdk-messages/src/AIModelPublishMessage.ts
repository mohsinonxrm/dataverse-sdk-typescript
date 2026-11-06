import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AIModelPublish message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AIModelPublishRequestParameters {
  TemplateId: string;
  Source?: string;
  RunConfiguration: string;
  ModelId: string;
  CustomConfiguration: string;
  RunConfigurationId: string;
  ModelName: string;
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
      TemplateId: this.Parameters.TemplateId,
      Source: this.Parameters.Source,
      RunConfiguration: this.Parameters.RunConfiguration,
      ModelId: this.Parameters.ModelId,
      CustomConfiguration: this.Parameters.CustomConfiguration,
      RunConfigurationId: this.Parameters.RunConfigurationId,
      ModelName: this.Parameters.ModelName,
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
    if (response.status === 204) return AIModelPublishResponse.fromResponse({});
    return AIModelPublishResponse.fromResponse(await response.json());
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
