import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { QuestionAnalyticsResponse as QuestionAnalyticsResponseData } from "./types/index.js";

/**
 * Parameters of the QuestionAnalytics message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QuestionAnalyticsRequestParameters {
  botId: string;
  page?: number;
  endDateTime: string;
  startDateTime: string;
  state: string;
  count?: number;
}

/**
 * QuestionAnalytics request message
 *
 * Web API Action: QuestionAnalytics
 */
export class QuestionAnalyticsRequest
  extends OrganizationRequest
  implements Executable<QuestionAnalyticsResponse>
{
  declare readonly Parameters: Readonly<QuestionAnalyticsRequestParameters>;

  constructor(parameters: QuestionAnalyticsRequestParameters) {
    super("QuestionAnalytics", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/QuestionAnalytics`;

    const body = requestBody({
      botId: this.Parameters.botId,
      page: this.Parameters.page,
      endDateTime: this.Parameters.endDateTime,
      startDateTime: this.Parameters.startDateTime,
      state: this.Parameters.state,
      count: this.Parameters.count,
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
    return QuestionAnalyticsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * QuestionAnalytics response message
 */
export class QuestionAnalyticsResponse extends OrganizationResponse {
  constructor(public result: QuestionAnalyticsResponseData) {
    super("QuestionAnalytics");
  }

  static fromResponse(data: unknown): QuestionAnalyticsResponse {
    return new QuestionAnalyticsResponse(responseObject<QuestionAnalyticsResponseData>(data));
  }
}
