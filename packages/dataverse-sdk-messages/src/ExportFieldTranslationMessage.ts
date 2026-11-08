import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ExportFieldTranslation request message
 *
 * Web API Function: ExportFieldTranslation
 */
export class ExportFieldTranslationRequest
  extends OrganizationRequest
  implements Executable<ExportFieldTranslationResponse>
{
  constructor() {
    super("ExportFieldTranslation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ExportFieldTranslation`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ExportFieldTranslationResponse> {
    // The body is the complex value, with its @odata.context
    return ExportFieldTranslationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ExportFieldTranslation function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExportFieldTranslationResult {
  "@odata.context"?: string;
  ExportTranslationFile: string;
}

/**
 * ExportFieldTranslation response message
 *
 * `result` is the value the ExportFieldTranslation function returns (see {@link ExportFieldTranslationResult}).
 */
export class ExportFieldTranslationResponse extends OrganizationResponse {
  constructor(public result: ExportFieldTranslationResult) {
    super("ExportFieldTranslation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ExportFieldTranslationResponse {
    return new ExportFieldTranslationResponse(data as ExportFieldTranslationResult);
  }
}
