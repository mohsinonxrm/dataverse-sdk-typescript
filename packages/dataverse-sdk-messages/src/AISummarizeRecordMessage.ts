import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * AISummarizeRecord request message
 *
 * Web API Action: AISummarizeRecord
 */
export class AISummarizeRecordRequest
  extends OrganizationRequest
  implements Executable<AISummarizeRecordResponse>
{
  constructor(
    public id: string,
    public entityLogicalName: string,
    public recordContext: string,
    public isMergedCatchupAndSummary: boolean
  ) {
    super("AISummarizeRecord");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AISummarizeRecord`;

    const body: Record<string, unknown> = {
      Id: this.id,
      EntityLogicalName: this.entityLogicalName,
      RecordContext: this.recordContext,
      IsMergedCatchupAndSummary: this.isMergedCatchupAndSummary,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<AISummarizeRecordResponse> {
    const data = await response.json();
    return AISummarizeRecordResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Id: this.id,
      EntityLogicalName: this.entityLogicalName,
      RecordContext: this.recordContext,
      IsMergedCatchupAndSummary: this.isMergedCatchupAndSummary,
    };
  }
}

/**
 * AISummarizeRecord response message
 */
export class AISummarizeRecordResponse extends OrganizationResponse {
  constructor(public result: AISummarizeRecordResponse) {
    super("AISummarizeRecord");
  }

  static fromResponse(data: unknown): AISummarizeRecordResponse {
    return new AISummarizeRecordResponse((data as any).value);
  }
}
