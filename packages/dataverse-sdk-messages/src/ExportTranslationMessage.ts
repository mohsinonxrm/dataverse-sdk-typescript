import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ExportTranslation request message
 *
 * Web API Action: ExportTranslation
 */
export class ExportTranslationRequest
  extends OrganizationRequest
  implements Executable<ExportTranslationResponse>
{
  constructor(public solutionName: string) {
    super("ExportTranslation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExportTranslation`;

    const body: Record<string, unknown> = {
      SolutionName: this.solutionName,
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

  async parseResponse(response: Response): Promise<ExportTranslationResponse> {
    const data = await response.json();
    return ExportTranslationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionName: this.solutionName,
    };
  }
}

/**
 * ExportTranslation response message
 */
export class ExportTranslationResponse extends OrganizationResponse {
  constructor(public result: ExportTranslationResponse) {
    super("ExportTranslation");
  }

  static fromResponse(data: unknown): ExportTranslationResponse {
    return new ExportTranslationResponse((data as any).value);
  }
}
