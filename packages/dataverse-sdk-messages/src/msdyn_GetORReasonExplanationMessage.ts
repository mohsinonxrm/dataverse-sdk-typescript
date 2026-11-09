import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetORReasonExplanation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetORReasonExplanationRequestParameters {
  EntityId: string;
  ExplanationObject: string;
  EntityType: number;
}

/**
 * msdyn_GetORReasonExplanation request message
 *
 * Web API Action: msdyn_GetORReasonExplanation
 */
export class msdyn_GetORReasonExplanationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetORReasonExplanationResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetORReasonExplanationRequestParameters>;

  constructor(parameters: msdyn_GetORReasonExplanationRequestParameters) {
    super("msdyn_GetORReasonExplanation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetORReasonExplanation`;

    const body = requestBody({
      EntityId: this.Parameters.EntityId,
      ExplanationObject: this.Parameters.ExplanationObject,
      EntityType: this.Parameters.EntityType,
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

  async parseResponse(response: Response): Promise<msdyn_GetORReasonExplanationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetORReasonExplanationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetORReasonExplanation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetORReasonExplanationResult {
  "@odata.context"?: string;
  ExplanationResult: string;
}

/**
 * msdyn_GetORReasonExplanation response message
 *
 * `result` is the value the msdyn_GetORReasonExplanation action returns (see {@link msdyn_GetORReasonExplanationResult}).
 */
export class msdyn_GetORReasonExplanationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetORReasonExplanationResult) {
    super("msdyn_GetORReasonExplanation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetORReasonExplanationResponse {
    return new msdyn_GetORReasonExplanationResponse(data as msdyn_GetORReasonExplanationResult);
  }
}
