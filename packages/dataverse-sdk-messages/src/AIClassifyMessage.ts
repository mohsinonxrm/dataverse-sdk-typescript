import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { AIClassifyResponse as AIClassifyResponseData } from "./types/index.js";

/**
 * Parameters of the AIClassify message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AIClassifyRequestParameters {
  Text: string;
  Categories: string[];
}

/**
 * AIClassify request message
 *
 * Web API Action: AIClassify
 */
export class AIClassifyRequest
  extends OrganizationRequest
  implements Executable<AIClassifyResponse>
{
  declare readonly Parameters: Readonly<AIClassifyRequestParameters>;

  constructor(parameters: AIClassifyRequestParameters) {
    super("AIClassify", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AIClassify`;

    const body = requestBody({
      Text: this.Parameters.Text,
      Categories: this.Parameters.Categories,
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

  async parseResponse(response: Response): Promise<AIClassifyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return AIClassifyResponse.fromResponse({});
    return AIClassifyResponse.fromResponse(await response.json());
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
