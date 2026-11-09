import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { SubstitutionResult } from "./types/index.js";

/**
 * Parameters of the SubstituteForAttribute message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SubstituteForAttributeRequestParameters {
  AttributeName: string;
  AttributeContent: string;
  SubStore: string;
}

/**
 * SubstituteForAttribute request message
 *
 * Web API Action: SubstituteForAttribute
 */
export class SubstituteForAttributeRequest
  extends OrganizationRequest
  implements Executable<SubstituteForAttributeResponse>
{
  declare readonly Parameters: Readonly<SubstituteForAttributeRequestParameters>;

  constructor(parameters: SubstituteForAttributeRequestParameters) {
    super("SubstituteForAttribute", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SubstituteForAttribute`;

    const body = requestBody({
      AttributeName: this.Parameters.AttributeName,
      AttributeContent: this.Parameters.AttributeContent,
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

  async parseResponse(response: Response): Promise<SubstituteForAttributeResponse> {
    // The body is the complex value, with its @odata.context
    return SubstituteForAttributeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the SubstituteForAttribute action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface SubstituteForAttributeResult {
  "@odata.context"?: string;
  Result: SubstitutionResult;
}

/**
 * SubstituteForAttribute response message
 *
 * `result` is the value the SubstituteForAttribute action returns (see {@link SubstituteForAttributeResult}).
 */
export class SubstituteForAttributeResponse extends OrganizationResponse {
  constructor(public result: SubstituteForAttributeResult) {
    super("SubstituteForAttribute");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): SubstituteForAttributeResponse {
    return new SubstituteForAttributeResponse(data as SubstituteForAttributeResult);
  }
}
