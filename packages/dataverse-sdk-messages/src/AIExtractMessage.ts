import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { AIExtractResponse as AIExtractResponseData } from "./types/index.js";

/**
 * Parameters of the AIExtract message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AIExtractRequestParameters {
  Text: string;
  Entity: string;
}

/**
 * AIExtract request message
 *
 * Web API Action: AIExtract
 */
export class AIExtractRequest extends OrganizationRequest implements Executable<AIExtractResponse> {
  declare readonly Parameters: Readonly<AIExtractRequestParameters>;

  constructor(parameters: AIExtractRequestParameters) {
    super("AIExtract", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AIExtract`;

    const body = requestBody({
      Text: this.Parameters.Text,
      Entity: this.Parameters.Entity,
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

  async parseResponse(response: Response): Promise<AIExtractResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return AIExtractResponse.fromResponse({});
    return AIExtractResponse.fromResponse(await response.json());
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
