import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgent_EnableAgentMailBoxResponse as msdyn_SalesAgent_EnableAgentMailBoxResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgent_EnableAgentMailBoxResponse.fromResponse({});
    return msdyn_SalesAgent_EnableAgentMailBoxResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgent_EnableAgentMailBox response message
 */
export class msdyn_SalesAgent_EnableAgentMailBoxResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgent_EnableAgentMailBoxResponseData) {
    super("msdyn_SalesAgent_EnableAgentMailBox");
  }

  static fromResponse(data: unknown): msdyn_SalesAgent_EnableAgentMailBoxResponse {
    return new msdyn_SalesAgent_EnableAgentMailBoxResponse(
      responseObject<msdyn_SalesAgent_EnableAgentMailBoxResponseData>(data)
    );
  }
}
