import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AISummarize message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AISummarizeRequestParameters {
  Text: string;
}

/**
 * AISummarize request message
 *
 * Web API Action: AISummarize
 */
export class AISummarizeRequest
  extends OrganizationRequest
  implements Executable<AISummarizeResponse>
{
  declare readonly Parameters: Readonly<AISummarizeRequestParameters>;

  constructor(parameters: AISummarizeRequestParameters) {
    super("AISummarize", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISummarize`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<AISummarizeResponse> {
    // The body is the complex value, with its @odata.context
    return AISummarizeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AISummarize action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AISummarizeResult {
  "@odata.context"?: string;
  SummarizedText: string;
}

/**
 * AISummarize response message
 *
 * `result` is the value the AISummarize action returns (see {@link AISummarizeResult}).
 */
export class AISummarizeResponse extends OrganizationResponse {
  constructor(public result: AISummarizeResult) {
    super("AISummarize");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AISummarizeResponse {
    return new AISummarizeResponse(data as AISummarizeResult);
  }
}
