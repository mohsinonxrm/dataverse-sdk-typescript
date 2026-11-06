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
  startDateTime: string;
  count?: number;
  botId: string;
  state: string;
  endDateTime: string;
  page?: number;
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
      startDateTime: this.Parameters.startDateTime,
      count: this.Parameters.count,
      botId: this.Parameters.botId,
      state: this.Parameters.state,
      endDateTime: this.Parameters.endDateTime,
      page: this.Parameters.page,
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
    if (response.status === 204) return QuestionAnalyticsResponse.fromResponse({});
    return QuestionAnalyticsResponse.fromResponse(await response.json());
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
