import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return AIModelPublishResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return AIModelPublishResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AIModelPublish action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type AIModelPublishResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * AIModelPublish response message
 *
 * `result` is the value the AIModelPublish action returns (see {@link AIModelPublishResult}).
 */
export class AIModelPublishResponse extends OrganizationResponse {
  constructor(public result: AIModelPublishResult) {
    super("AIModelPublish");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AIModelPublishResponse {
    return new AIModelPublishResponse((data ?? null) as AIModelPublishResult);
  }
}
