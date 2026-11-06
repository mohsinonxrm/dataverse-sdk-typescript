import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
 * Parameters of the QuestionAnalytics action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QuestionAnalyticsActionParameters {
  botId: string;
  page?: number;
  endDateTime: string;
  startDateTime: string;
  state: string;
  count?: number;
}

/**
 * QuestionAnalytics action
 *
 * Unbound action
 */
export class QuestionAnalyticsAction implements Executable<QuestionAnalyticsResponse> {
  constructor(public readonly parameters: QuestionAnalyticsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QuestionAnalytics`;

    const body = requestBody({
      botId: this.parameters.botId,
      page: this.parameters.page,
      endDateTime: this.parameters.endDateTime,
      startDateTime: this.parameters.startDateTime,
      state: this.parameters.state,
      count: this.parameters.count,
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

  async parseResponse(response: Response): Promise<QuestionAnalyticsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as QuestionAnalyticsResponse;
  }
}
