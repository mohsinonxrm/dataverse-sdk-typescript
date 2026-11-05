import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { AIExtractResponse as AIExtractResponseData } from "./types/index.js";

/**
 * AIExtract request message
 *
 * Web API Action: AIExtract
 */
export class AIExtractRequest extends OrganizationRequest implements Executable<AIExtractResponse> {
  constructor(
    public text: string,
    public entity: string
  ) {
    super("AIExtract");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AIExtract`;

    const body: Record<string, unknown> = {
      Text: this.text,
      Entity: this.entity,
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

  async parseResponse(response: Response): Promise<AIExtractResponse> {
    const data = await response.json();
    return AIExtractResponse.fromResponse(data);
  }
}

/**
 * AIExtract response message
 */
export class AIExtractResponse extends OrganizationResponse {
  constructor(public result: AIExtractResponseData) {
    super("AIExtract");
  }

  static fromResponse(data: unknown): AIExtractResponse {
    return new AIExtractResponse(responseObject<AIExtractResponseData>(data));
  }
}
