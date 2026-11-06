import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from QuestionAnalytics action
 */
export interface QuestionAnalyticsResponse {
  moreRecords: boolean;
  page: number;
  pagingCookie: string;
  value: string;
}

/**
 * Parameters of the QuestionAnalytics action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QuestionAnalyticsActionParameters {
  startDateTime: string;
  count?: number;
  botId: string;
  state: string;
  endDateTime: string;
  page?: number;
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
      startDateTime: this.parameters.startDateTime,
      count: this.parameters.count,
      botId: this.parameters.botId,
      state: this.parameters.state,
      endDateTime: this.parameters.endDateTime,
      page: this.parameters.page,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as QuestionAnalyticsResponse;
    return (await response.json()) as QuestionAnalyticsResponse;
  }
}
