import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the _EvaluateSearchRequest message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _EvaluateSearchRequestRequestParameters {
  ServiceAppointmentId?: string;
  ServiceId: string;
  DateOptionSet?: number;
  TimeOptionSet?: number;
  DayList?: string;
  RequiredResources?: Record<string, unknown>[];
  SearchWindowStart?: string;
  SearchWindowEnd?: string;
  SearchRecurrenceStart?: number;
  TimeRangeEnd?: number;
  Duration: number;
  Direction?: number;
  Sites?: Record<string, unknown>[];
  NumberOfResults?: number;
  _SearchWindowStart?: string;
  _SearchWindowEnd?: string;
}

/**
 * _EvaluateSearchRequest request message
 *
 * Web API Action: _EvaluateSearchRequest
 */
export class _EvaluateSearchRequestRequest
  extends OrganizationRequest
  implements Executable<_EvaluateSearchRequestResponse>
{
  declare readonly Parameters: Readonly<_EvaluateSearchRequestRequestParameters>;

  constructor(parameters: _EvaluateSearchRequestRequestParameters) {
    super("_EvaluateSearchRequest", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_EvaluateSearchRequest`;

    const body = requestBody({
      ServiceAppointmentId: this.Parameters.ServiceAppointmentId,
      ServiceId: this.Parameters.ServiceId,
      DateOptionSet: this.Parameters.DateOptionSet,
      TimeOptionSet: this.Parameters.TimeOptionSet,
      DayList: this.Parameters.DayList,
      RequiredResources: this.Parameters.RequiredResources,
      SearchWindowStart: this.Parameters.SearchWindowStart,
      SearchWindowEnd: this.Parameters.SearchWindowEnd,
      SearchRecurrenceStart: this.Parameters.SearchRecurrenceStart,
      TimeRangeEnd: this.Parameters.TimeRangeEnd,
      Duration: this.Parameters.Duration,
      Direction: this.Parameters.Direction,
      Sites: this.Parameters.Sites,
      NumberOfResults: this.Parameters.NumberOfResults,
      _SearchWindowStart: this.Parameters._SearchWindowStart,
      _SearchWindowEnd: this.Parameters._SearchWindowEnd,
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

  async parseResponse(response: Response): Promise<_EvaluateSearchRequestResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return _EvaluateSearchRequestResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return _EvaluateSearchRequestResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the _EvaluateSearchRequest action.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type _EvaluateSearchRequestResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * _EvaluateSearchRequest response message
 *
 * `result` is the value the _EvaluateSearchRequest action returns (see {@link _EvaluateSearchRequestResult}).
 */
export class _EvaluateSearchRequestResponse extends OrganizationResponse {
  constructor(public result: _EvaluateSearchRequestResult) {
    super("_EvaluateSearchRequest");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): _EvaluateSearchRequestResponse {
    return new _EvaluateSearchRequestResponse(
      data === undefined ? [] : (data as { value: _EvaluateSearchRequestResult }).value
    );
  }
}
