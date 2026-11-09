import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AIExtract message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AIExtractRequestParameters {
  Entity: string;
  Text: string;
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
      Entity: this.Parameters.Entity,
      Text: this.Parameters.Text,
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
    // The body is the complex value, with its @odata.context
    return AIExtractResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AIExtract action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AIExtractResult {
  "@odata.context"?: string;
  ExtractedData: string[];
}

/**
 * AIExtract response message
 *
 * `result` is the value the AIExtract action returns (see {@link AIExtractResult}).
 */
export class AIExtractResponse extends OrganizationResponse {
  constructor(public result: AIExtractResult) {
    super("AIExtract");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AIExtractResponse {
    return new AIExtractResponse(data as AIExtractResult);
  }
}
