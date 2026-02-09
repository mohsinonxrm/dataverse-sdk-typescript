import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CategorizeText request message
 *
 * Web API Action: CategorizeText
 */
export class CategorizeTextRequest
  extends OrganizationRequest
  implements Executable<CategorizeTextResponse>
{
  constructor(
    public text: string,
    public modelId: string,
    public language: string
  ) {
    super("CategorizeText");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CategorizeText`;

    const body: Record<string, unknown> = {
      text: this.text,
      modelId: this.modelId,
      language: this.language,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CategorizeTextResponse> {
    const data = await response.json();
    return CategorizeTextResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      text: this.text,
      modelId: this.modelId,
      language: this.language,
    };
  }
}

/**
 * CategorizeText response message
 */
export class CategorizeTextResponse extends OrganizationResponse {
  constructor(public result: CategorizeTextResponse) {
    super("CategorizeText");
  }

  static fromResponse(data: unknown): CategorizeTextResponse {
    return new CategorizeTextResponse((data as any).value);
  }
}
