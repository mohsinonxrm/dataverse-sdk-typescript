import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * QuestionAnalytics request message
 *
 * Web API Action: QuestionAnalytics
 */
export class QuestionAnalyticsRequest
  extends OrganizationRequest
  implements Executable<QuestionAnalyticsResponse>
{
  constructor(
    public botId: string,
    public page: number,
    public endDateTime: string,
    public startDateTime: string,
    public state: string,
    public count: number
  ) {
    super("QuestionAnalytics");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<QuestionAnalyticsResponse> {
    const data = await response.json();
    return QuestionAnalyticsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      botId: this.botId,
      page: this.page,
      endDateTime: this.endDateTime,
      startDateTime: this.startDateTime,
      state: this.state,
      count: this.count,
    };
  }
}

/**
 * QuestionAnalytics response message
 */
export class QuestionAnalyticsResponse extends OrganizationResponse {
  constructor(public result: QuestionAnalyticsResponse) {
    super("QuestionAnalytics");
  }

  static fromResponse(data: unknown): QuestionAnalyticsResponse {
    return new QuestionAnalyticsResponse((data as any).value);
  }
}
