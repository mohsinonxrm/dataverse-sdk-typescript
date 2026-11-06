import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { SummarizeRecordResponse as SummarizeRecordResponseData } from "./types/index.js";

/**
 * Parameters of the SummarizeRecord message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SummarizeRecordRequestParameters {
  Id: string;
  EntityLogicalName: string;
  RecordContext?: string;
  IsMergedCatchupAndSummary?: boolean;
}

/**
 * SummarizeRecord request message
 *
 * Web API Action: SummarizeRecord
 */
export class SummarizeRecordRequest
  extends OrganizationRequest
  implements Executable<SummarizeRecordResponse>
{
  declare readonly Parameters: Readonly<SummarizeRecordRequestParameters>;

  constructor(parameters: SummarizeRecordRequestParameters) {
    super("SummarizeRecord", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SummarizeRecord`;

    const body = requestBody({
      Id: this.Parameters.Id,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      RecordContext: this.Parameters.RecordContext,
      IsMergedCatchupAndSummary: this.Parameters.IsMergedCatchupAndSummary,
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

  async parseResponse(response: Response): Promise<SummarizeRecordResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return SummarizeRecordResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * SummarizeRecord response message
 */
export class SummarizeRecordResponse extends OrganizationResponse {
  constructor(public result: SummarizeRecordResponseData) {
    super("SummarizeRecord");
  }

  static fromResponse(data: unknown): SummarizeRecordResponse {
    return new SummarizeRecordResponse(responseObject<SummarizeRecordResponseData>(data));
  }
}
