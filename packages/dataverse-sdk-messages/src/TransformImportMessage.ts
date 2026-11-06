import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return TransformImportResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * TransformImport response message
 */
export class TransformImportResponse extends OrganizationResponse {
  constructor(public result: asyncoperation) {
    super("TransformImport");
  }

  static fromResponse(data: unknown): TransformImportResponse {
    return new TransformImportResponse(responseObject<asyncoperation>(data));
  }
}
