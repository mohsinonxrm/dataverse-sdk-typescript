import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * AISummarize request message
 *
 * Web API Action: AISummarize
 */
export class AISummarizeRequest
  extends OrganizationRequest
  implements Executable<AISummarizeResponse>
{
  constructor(public text: string) {
    super("AISummarize");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISummarize`;

    const body: Record<string, unknown> = {
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

  async parseResponse(response: Response): Promise<AISummarizeResponse> {
    const data = await response.json();
    return AISummarizeResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Text: this.text,
    };
  }
}

/**
 * AISummarize response message
 */
export class AISummarizeResponse extends OrganizationResponse {
  constructor(public result: AISummarizeResponse) {
    super("AISummarize");
  }

  static fromResponse(data: unknown): AISummarizeResponse {
    return new AISummarizeResponse((data as any).value);
  }
}
