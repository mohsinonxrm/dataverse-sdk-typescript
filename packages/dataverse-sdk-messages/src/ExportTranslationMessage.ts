import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ExportTranslationResponse as ExportTranslationResponseData } from "./types/index.js";

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
    // Bound action (entity collection)
    const url = `${baseUrl}/solutions/Microsoft.Dynamics.CRM.ExportTranslation`;

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
}

/**
 * ExportTranslation response message
 */
export class ExportTranslationResponse extends OrganizationResponse {
  constructor(public result: ExportTranslationResponseData) {
    super("ExportTranslation");
  }

  static fromResponse(data: unknown): ExportTranslationResponse {
    return new ExportTranslationResponse(responseObject<ExportTranslationResponseData>(data));
  }
}
