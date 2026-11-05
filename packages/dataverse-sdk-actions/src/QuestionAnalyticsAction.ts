import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from QuestionAnalytics action
 */
export interface QuestionAnalyticsResponse {
  value: string;
  pagingCookie: string;
  moreRecords: boolean;
  page: number;
}

/**
 * QuestionAnalytics action
 *
 * Unbound action
 */
export class QuestionAnalyticsAction implements Executable<QuestionAnalyticsResponse> {
  constructor(
    public readonly botId: string,
    public readonly page: number,
    public readonly endDateTime: string,
    public readonly startDateTime: string,
    public readonly state: string,
    public readonly count: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QuestionAnalytics`;

    const body: Record<string, unknown> = {
      botId: this.botId,
      page: this.page,
      endDateTime: this.endDateTime,
      startDateTime: this.startDateTime,
      state: this.state,
      count: this.count,
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

  async parseResponse(response: Response): Promise<QuestionAnalyticsResponse> {
    const data = await response.json();
    return data as QuestionAnalyticsResponse;
  }
}
