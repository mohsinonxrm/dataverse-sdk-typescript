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
  IsMergedCatchupAndSummary?: boolean;
  RecordContext?: string;
  EntityLogicalName: string;
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
      IsMergedCatchupAndSummary: this.Parameters.IsMergedCatchupAndSummary,
      RecordContext: this.Parameters.RecordContext,
      EntityLogicalName: this.Parameters.EntityLogicalName,
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
    // 204 No Content is an empty result
    if (response.status === 204) return SummarizeRecordResponse.fromResponse({});
    return SummarizeRecordResponse.fromResponse(await response.json());
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
