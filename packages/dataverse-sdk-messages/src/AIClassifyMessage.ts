import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      Categories: this.categories,
      Text: this.text,
    };
  }
}

/**
 * AIClassify response message
 */
export class AIClassifyResponse extends OrganizationResponse {
  constructor(public result: AIClassifyResponse) {
    super("AIClassify");
  }

  static fromResponse(data: unknown): AIClassifyResponse {
    return new AIClassifyResponse((data as any).value);
  }
}
