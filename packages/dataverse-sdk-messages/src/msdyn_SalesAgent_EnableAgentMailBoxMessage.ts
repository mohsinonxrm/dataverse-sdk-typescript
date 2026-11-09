import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgent_EnableAgentMailBox message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgent_EnableAgentMailBoxRequestParameters {
  AadUserId?: string;
  MailboxId?: string;
}

/**
 * msdyn_SalesAgent_EnableAgentMailBox request message
 *
 * Web API Action: msdyn_SalesAgent_EnableAgentMailBox
 */
export class msdyn_SalesAgent_EnableAgentMailBoxRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgent_EnableAgentMailBoxResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgent_EnableAgentMailBoxRequestParameters>;

  constructor(parameters: msdyn_SalesAgent_EnableAgentMailBoxRequestParameters = {}) {
    super("msdyn_SalesAgent_EnableAgentMailBox", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgent_EnableAgentMailBox`;

    const body = requestBody({
      AadUserId: this.Parameters.AadUserId,
      MailboxId: this.Parameters.MailboxId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgent_EnableAgentMailBoxResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgent_EnableAgentMailBoxResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgent_EnableAgentMailBox action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgent_EnableAgentMailBoxResult {
  "@odata.context"?: string;
  Message: string;
  Success: boolean;
}

/**
 * msdyn_SalesAgent_EnableAgentMailBox response message
 *
 * `result` is the value the msdyn_SalesAgent_EnableAgentMailBox action returns (see {@link msdyn_SalesAgent_EnableAgentMailBoxResult}).
 */
export class msdyn_SalesAgent_EnableAgentMailBoxResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgent_EnableAgentMailBoxResult) {
    super("msdyn_SalesAgent_EnableAgentMailBox");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgent_EnableAgentMailBoxResponse {
    return new msdyn_SalesAgent_EnableAgentMailBoxResponse(
      data as msdyn_SalesAgent_EnableAgentMailBoxResult
    );
  }
}
