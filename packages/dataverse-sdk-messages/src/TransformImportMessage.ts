import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { asyncoperation } from "./types/index.js";

/**
 * TransformImport request message
 *
 * Web API Action: TransformImport
 */
export class TransformImportRequest
  extends OrganizationRequest
  implements Executable<TransformImportResponse>
{
  constructor(public importId: string) {
    super("TransformImport");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/TransformImport`;

    const body: Record<string, unknown> = {
      ImportId: this.importId,
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

  async parseResponse(response: Response): Promise<TransformImportResponse> {
    const data = await response.json();
    return TransformImportResponse.fromResponse(data);
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
