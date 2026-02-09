import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * SetReportRelated request message
 *
 * Web API Action: SetReportRelated
 */
export class SetReportRelatedRequest
  extends OrganizationRequest
  implements Executable<SetReportRelatedResponse>
{
  constructor(
    public reportId: string,
    public entities: number[],
    public categories: number[],
    public visibility: number[]
  ) {
    super("SetReportRelated");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetReportRelated`;

    const body: Record<string, unknown> = {
      ReportId: this.reportId,
      Entities: this.entities,
      Categories: this.categories,
      Visibility: this.visibility,
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

  async parseResponse(response: Response): Promise<SetReportRelatedResponse> {
    // No return value (204 No Content)
    return new SetReportRelatedResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ReportId: this.reportId,
      Entities: this.entities,
      Categories: this.categories,
      Visibility: this.visibility,
    };
  }
}

/**
 * SetReportRelated response message
 */
export class SetReportRelatedResponse extends OrganizationResponse {
  constructor() {
    super("SetReportRelated");
  }

  static fromResponse(_data: unknown): SetReportRelatedResponse {
    return new SetReportRelatedResponse();
  }
}
