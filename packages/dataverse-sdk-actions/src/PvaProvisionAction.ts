import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the PvaProvision action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type PvaProvisionResponse = void;

/**
 * PvaProvision action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bot)
 *
 * The first argument is the id of the bot record to call it on.
 */
export class PvaProvisionAction implements Executable<PvaProvisionResponse> {
  constructor(public readonly botId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaProvision`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<PvaProvisionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
