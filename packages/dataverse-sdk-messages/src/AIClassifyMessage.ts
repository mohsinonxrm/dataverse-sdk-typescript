import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return AIClassifyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AIClassify action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AIClassifyResult {
  "@odata.context"?: string;
  Classification: string;
}

/**
 * AIClassify response message
 *
 * `result` is the value the AIClassify action returns (see {@link AIClassifyResult}).
 */
export class AIClassifyResponse extends OrganizationResponse {
  constructor(public result: AIClassifyResult) {
    super("AIClassify");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AIClassifyResponse {
    return new AIClassifyResponse(data as AIClassifyResult);
  }
}
