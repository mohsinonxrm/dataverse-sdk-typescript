import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CreateDraftResponseForAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateDraftResponseForActionRequestParameters {
  msdyn_input: string;
}

/**
 * msdyn_CreateDraftResponseForAction request message
 *
 * Web API Action: msdyn_CreateDraftResponseForAction
 */
export class msdyn_CreateDraftResponseForActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateDraftResponseForActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateDraftResponseForActionRequestParameters>;

  constructor(parameters: msdyn_CreateDraftResponseForActionRequestParameters) {
    super("msdyn_CreateDraftResponseForAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateDraftResponseForAction`;

    const body = requestBody({
      msdyn_input: this.Parameters.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_CreateDraftResponseForActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CreateDraftResponseForActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateDraftResponseForAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateDraftResponseForActionResult {
  "@odata.context"?: string;
  msdyn_actionType: number;
  msdyn_cc: string[];
  msdyn_description: string;
  msdyn_internetMessageId: string;
  msdyn_messageId: string;
  msdyn_scheduledEnd: string;
  msdyn_scheduledStart: string;
  msdyn_subject: string;
  msdyn_to: string[];
}

/**
 * msdyn_CreateDraftResponseForAction response message
 *
 * `result` is the value the msdyn_CreateDraftResponseForAction action returns (see {@link msdyn_CreateDraftResponseForActionResult}).
 */
export class msdyn_CreateDraftResponseForActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateDraftResponseForActionResult) {
    super("msdyn_CreateDraftResponseForAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateDraftResponseForActionResponse {
    return new msdyn_CreateDraftResponseForActionResponse(
      data as msdyn_CreateDraftResponseForActionResult
    );
  }
}
