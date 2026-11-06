import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { ExportTranslationResponse as ExportTranslationResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return ExportTranslationResponse.fromResponse(text ? JSON.parse(text) : {});
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
