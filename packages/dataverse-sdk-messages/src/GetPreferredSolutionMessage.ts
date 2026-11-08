import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * GetPreferredSolution request message
 *
 * Web API Function: GetPreferredSolution
 */
export class GetPreferredSolutionRequest
  extends OrganizationRequest
  implements Executable<GetPreferredSolutionResponse>
{
  constructor() {
    super("GetPreferredSolution");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetPreferredSolution`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetPreferredSolutionResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return GetPreferredSolutionResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return GetPreferredSolutionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetPreferredSolution function.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GetPreferredSolutionResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * GetPreferredSolution response message
 *
 * `result` is the value the GetPreferredSolution function returns (see {@link GetPreferredSolutionResult}).
 */
export class GetPreferredSolutionResponse extends OrganizationResponse {
  constructor(public result: GetPreferredSolutionResult) {
    super("GetPreferredSolution");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetPreferredSolutionResponse {
    return new GetPreferredSolutionResponse((data ?? null) as GetPreferredSolutionResult);
  }
}
