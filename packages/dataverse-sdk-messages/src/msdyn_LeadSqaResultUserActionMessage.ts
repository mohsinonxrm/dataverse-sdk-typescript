import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_LeadSqaResultUserAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LeadSqaResultUserActionRequestParameters {
  Action: string;
  ActionId: string;
  IsCallFromNba?: boolean;
  LeadId: string;
}

/**
 * msdyn_LeadSqaResultUserAction request message
 *
 * Web API Action: msdyn_LeadSqaResultUserAction
 */
export class msdyn_LeadSqaResultUserActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_LeadSqaResultUserActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_LeadSqaResultUserActionRequestParameters>;

  constructor(parameters: msdyn_LeadSqaResultUserActionRequestParameters) {
    super("msdyn_LeadSqaResultUserAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LeadSqaResultUserAction`;

    const body = requestBody({
      Action: this.Parameters.Action,
      ActionId: this.Parameters.ActionId,
      IsCallFromNba: this.Parameters.IsCallFromNba,
      LeadId: this.Parameters.LeadId,
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

  async parseResponse(response: Response): Promise<msdyn_LeadSqaResultUserActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_LeadSqaResultUserActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_LeadSqaResultUserAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_LeadSqaResultUserActionResult {
  "@odata.context"?: string;
  Message: string;
  Outcome: string;
  Retryable: boolean;
  Success: boolean;
}

/**
 * msdyn_LeadSqaResultUserAction response message
 *
 * `result` is the value the msdyn_LeadSqaResultUserAction action returns (see {@link msdyn_LeadSqaResultUserActionResult}).
 */
export class msdyn_LeadSqaResultUserActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_LeadSqaResultUserActionResult) {
    super("msdyn_LeadSqaResultUserAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_LeadSqaResultUserActionResponse {
    return new msdyn_LeadSqaResultUserActionResponse(data as msdyn_LeadSqaResultUserActionResult);
  }
}
