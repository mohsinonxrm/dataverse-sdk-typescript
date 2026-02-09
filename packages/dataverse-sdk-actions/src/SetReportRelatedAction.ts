import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from SetReportRelated action
 */
export interface SetReportRelatedResponse {
  // No content returned
}

/**
 * SetReportRelated action
 *
 * Unbound action
 */
export class SetReportRelatedAction implements Executable<SetReportRelatedResponse> {
  constructor(
    public readonly reportId: string,
    public readonly entities: number[],
    public readonly categories: number[],
    public readonly visibility: number[]
  ) {}

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
    return {};
  }
}
