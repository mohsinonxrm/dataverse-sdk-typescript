import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { AIClassifyResponse as AIClassifyResponseData } from "./types/index.js";

/**
 * AIClassify request message
 *
 * Web API Action: AIClassify
 */
export class AIClassifyRequest
  extends OrganizationRequest
  implements Executable<AIClassifyResponse>
{
  constructor(
    public categories: string[],
    public text: string
  ) {
    super("AIClassify");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AIClassify`;

    const body: Record<string, unknown> = {
      Categories: this.categories,
      Text: this.text,
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

  async parseResponse(response: Response): Promise<AIClassifyResponse> {
    const data = await response.json();
    return AIClassifyResponse.fromResponse(data);
  }
}

/**
 * AIClassify response message
 */
export class AIClassifyResponse extends OrganizationResponse {
  constructor(public result: AIClassifyResponseData) {
    super("AIClassify");
  }

  static fromResponse(data: unknown): AIClassifyResponse {
    return new AIClassifyResponse(responseObject<AIClassifyResponseData>(data));
  }
}
