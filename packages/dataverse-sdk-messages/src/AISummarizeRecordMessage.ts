import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { AISummarizeRecordResponse as AISummarizeRecordResponseData } from "./types/index.js";

/**
 * Parameters of the AISummarizeRecord message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AISummarizeRecordRequestParameters {
  RecordContext?: string;
  IsMergedCatchupAndSummary?: boolean;
  EntityLogicalName: string;
  Id: string;
}

/**
 * AISummarizeRecord request message
 *
 * Web API Action: AISummarizeRecord
 */
export class AISummarizeRecordRequest
  extends OrganizationRequest
  implements Executable<AISummarizeRecordResponse>
{
  declare readonly Parameters: Readonly<AISummarizeRecordRequestParameters>;

  constructor(parameters: AISummarizeRecordRequestParameters) {
    super("AISummarizeRecord", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISummarizeRecord`;

    const body = requestBody({
      RecordContext: this.Parameters.RecordContext,
      IsMergedCatchupAndSummary: this.Parameters.IsMergedCatchupAndSummary,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      Id: this.Parameters.Id,
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

  async parseResponse(response: Response): Promise<AISummarizeRecordResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return AISummarizeRecordResponse.fromResponse({});
    return AISummarizeRecordResponse.fromResponse(await response.json());
  }
}

/**
 * AISummarizeRecord response message
 */
export class AISummarizeRecordResponse extends OrganizationResponse {
  constructor(public result: AISummarizeRecordResponseData) {
    super("AISummarizeRecord");
  }

  static fromResponse(data: unknown): AISummarizeRecordResponse {
    return new AISummarizeRecordResponse(responseObject<AISummarizeRecordResponseData>(data));
  }
}
