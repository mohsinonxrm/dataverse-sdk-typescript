import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { importjob } from "./types/index.js";

/**
 * Parameters of the ImportFieldTranslation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ImportFieldTranslationRequestParameters {
  TranslationFile: string;
}

/**
 * ImportFieldTranslation request message
 *
 * Web API Action: ImportFieldTranslation
 */
export class ImportFieldTranslationRequest
  extends OrganizationRequest
  implements Executable<ImportFieldTranslationResponse>
{
  declare readonly Parameters: Readonly<ImportFieldTranslationRequestParameters>;

  constructor(parameters: ImportFieldTranslationRequestParameters) {
    super("ImportFieldTranslation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ImportFieldTranslation`;

    const body = requestBody({
      TranslationFile: this.Parameters.TranslationFile,
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

  async parseResponse(response: Response): Promise<ImportFieldTranslationResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return ImportFieldTranslationResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return ImportFieldTranslationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ImportFieldTranslation action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type ImportFieldTranslationResult =
  | (importjob & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * ImportFieldTranslation response message
 *
 * `result` is the value the ImportFieldTranslation action returns (see {@link ImportFieldTranslationResult}).
 */
export class ImportFieldTranslationResponse extends OrganizationResponse {
  constructor(public result: ImportFieldTranslationResult) {
    super("ImportFieldTranslation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ImportFieldTranslationResponse {
    return new ImportFieldTranslationResponse((data ?? null) as ImportFieldTranslationResult);
  }
}
