import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveProcessWithWfomJson request message
 *
 * Web API Function: RetrieveProcessWithWfomJson
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class RetrieveProcessWithWfomJsonRequest
  extends OrganizationRequest
  implements Executable<RetrieveProcessWithWfomJsonResponse>
{
  constructor(public workflowId: string) {
    super("RetrieveProcessWithWfomJson");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.RetrieveProcessWithWfomJson`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveProcessWithWfomJsonResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveProcessWithWfomJsonResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveProcessWithWfomJson function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveProcessWithWfomJsonResult {
  "@odata.context"?: string;
  WfomJson: string;
}

/**
 * RetrieveProcessWithWfomJson response message
 *
 * `result` is the value the RetrieveProcessWithWfomJson function returns (see {@link RetrieveProcessWithWfomJsonResult}).
 */
export class RetrieveProcessWithWfomJsonResponse extends OrganizationResponse {
  constructor(public result: RetrieveProcessWithWfomJsonResult) {
    super("RetrieveProcessWithWfomJson");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveProcessWithWfomJsonResponse {
    return new RetrieveProcessWithWfomJsonResponse(data as RetrieveProcessWithWfomJsonResult);
  }
}
