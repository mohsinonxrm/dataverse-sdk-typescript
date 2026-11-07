import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return QuestionAnalyticsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the QuestionAnalytics action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface QuestionAnalyticsResult {
  "@odata.context"?: string;
  moreRecords: boolean;
  page: number;
  pagingCookie: string;
  value: string;
}

/**
 * QuestionAnalytics response message
 *
 * `result` is the value the QuestionAnalytics action returns (see {@link QuestionAnalyticsResult}).
 */
export class QuestionAnalyticsResponse extends OrganizationResponse {
  constructor(public result: QuestionAnalyticsResult) {
    super("QuestionAnalytics");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): QuestionAnalyticsResponse {
    return new QuestionAnalyticsResponse(data as QuestionAnalyticsResult);
  }
}
