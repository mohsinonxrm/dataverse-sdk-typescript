import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAgent_EnableAgentMailBox action
 */
export interface msdyn_SalesAgent_EnableAgentMailBoxResponse {
  Message: string;
  Success: boolean;
}

/**
 * Parameters of the msdyn_SalesAgent_EnableAgentMailBox action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgent_EnableAgentMailBoxActionParameters {
  AadUserId?: string;
  MailboxId?: string;
}

/**
 * msdyn_SalesAgent_EnableAgentMailBox action
 *
 * Unbound action
 */
export class msdyn_SalesAgent_EnableAgentMailBoxAction implements Executable<msdyn_SalesAgent_EnableAgentMailBoxResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAgent_EnableAgentMailBoxActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgent_EnableAgentMailBox`;

    const body = requestBody({
      AadUserId: this.parameters.AadUserId,
      MailboxId: this.parameters.MailboxId,
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
    if (response.status === 204) return {} as msdyn_SalesAgent_EnableAgentMailBoxResponse;
    return (await response.json()) as msdyn_SalesAgent_EnableAgentMailBoxResponse;
  }
}
