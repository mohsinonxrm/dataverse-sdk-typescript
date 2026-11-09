import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { asyncoperation } from "./types/index.js";

/**
 * Parameters of the TransformImport message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface TransformImportRequestParameters {
  ImportId: string;
}

/**
 * TransformImport request message
 *
 * Web API Action: TransformImport
 */
export class TransformImportRequest
  extends OrganizationRequest
  implements Executable<TransformImportResponse>
{
  declare readonly Parameters: Readonly<TransformImportRequestParameters>;

  constructor(parameters: TransformImportRequestParameters) {
    super("TransformImport", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/TransformImport`;

    const body = requestBody({
      ImportId: this.Parameters.ImportId,
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

  async parseResponse(response: Response): Promise<TransformImportResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return TransformImportResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return TransformImportResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the TransformImport action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type TransformImportResult =
  | (asyncoperation & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * TransformImport response message
 *
 * `result` is the value the TransformImport action returns (see {@link TransformImportResult}).
 */
export class TransformImportResponse extends OrganizationResponse {
  constructor(public result: TransformImportResult) {
    super("TransformImport");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): TransformImportResponse {
    return new TransformImportResponse((data ?? null) as TransformImportResult);
  }
}
