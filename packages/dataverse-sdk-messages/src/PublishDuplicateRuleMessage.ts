import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { asyncoperation } from "./types/index.js";

/**
 * PublishDuplicateRule request message
 *
 * Web API Action: PublishDuplicateRule
 *
 * The first argument is the id of the duplicaterule record to call it on.
 */
export class PublishDuplicateRuleRequest
  extends OrganizationRequest
  implements Executable<PublishDuplicateRuleResponse>
{
  constructor(public duplicateruleId: string) {
    super("PublishDuplicateRule");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/duplicaterules(${this.duplicateruleId})/Microsoft.Dynamics.CRM.PublishDuplicateRule`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PublishDuplicateRuleResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return PublishDuplicateRuleResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return PublishDuplicateRuleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PublishDuplicateRule action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type PublishDuplicateRuleResult =
  | (asyncoperation & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * PublishDuplicateRule response message
 *
 * `result` is the value the PublishDuplicateRule action returns (see {@link PublishDuplicateRuleResult}).
 */
export class PublishDuplicateRuleResponse extends OrganizationResponse {
  constructor(public result: PublishDuplicateRuleResult) {
    super("PublishDuplicateRule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PublishDuplicateRuleResponse {
    return new PublishDuplicateRuleResponse((data ?? null) as PublishDuplicateRuleResult);
  }
}
