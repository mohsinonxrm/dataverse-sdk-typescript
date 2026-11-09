import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the ExportTranslation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ExportTranslationRequestParameters {
  SolutionName: string;
}

/**
 * ExportTranslation request message
 *
 * Web API Action: ExportTranslation
 */
export class ExportTranslationRequest
  extends OrganizationRequest
  implements Executable<ExportTranslationResponse>
{
  declare readonly Parameters: Readonly<ExportTranslationRequestParameters>;

  constructor(parameters: ExportTranslationRequestParameters) {
    super("ExportTranslation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/solutions/Microsoft.Dynamics.CRM.ExportTranslation`;

    const body = requestBody({
      SolutionName: this.Parameters.SolutionName,
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

  async parseResponse(response: Response): Promise<ExportTranslationResponse> {
    // The body is the complex value, with its @odata.context
    return ExportTranslationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ExportTranslation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ExportTranslationResult {
  "@odata.context"?: string;
  ExportTranslationFile: string;
}

/**
 * ExportTranslation response message
 *
 * `result` is the value the ExportTranslation action returns (see {@link ExportTranslationResult}).
 */
export class ExportTranslationResponse extends OrganizationResponse {
  constructor(public result: ExportTranslationResult) {
    super("ExportTranslation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ExportTranslationResponse {
    return new ExportTranslationResponse(data as ExportTranslationResult);
  }
}
