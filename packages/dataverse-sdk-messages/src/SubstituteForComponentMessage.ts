import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { SubstitutionResult } from "./types/index.js";

/**
 * Parameters of the SubstituteForComponent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SubstituteForComponentRequestParameters {
  Entity: EntityReference | AnyEntityPayload;
  SubStore: string;
}

/**
 * SubstituteForComponent request message
 *
 * Web API Action: SubstituteForComponent
 */
export class SubstituteForComponentRequest
  extends OrganizationRequest
  implements Executable<SubstituteForComponentResponse>
{
  declare readonly Parameters: Readonly<SubstituteForComponentRequestParameters>;

  constructor(parameters: SubstituteForComponentRequestParameters) {
    super("SubstituteForComponent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SubstituteForComponent`;

    const body = requestBody({
      Entity: this.Parameters.Entity,
      SubStore: this.Parameters.SubStore,
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

  async parseResponse(response: Response): Promise<SubstituteForComponentResponse> {
    // The body is the complex value, with its @odata.context
    return SubstituteForComponentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SubstituteForComponent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SubstituteForComponentResult {
  "@odata.context"?: string;
  Result: SubstitutionResult;
}

/**
 * SubstituteForComponent response message
 *
 * `result` is the value the SubstituteForComponent action returns (see {@link SubstituteForComponentResult}).
 */
export class SubstituteForComponentResponse extends OrganizationResponse {
  constructor(public result: SubstituteForComponentResult) {
    super("SubstituteForComponent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SubstituteForComponentResponse {
    return new SubstituteForComponentResponse(data as SubstituteForComponentResult);
  }
}
