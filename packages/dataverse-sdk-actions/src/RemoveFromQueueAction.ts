import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RemoveFromQueue action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RemoveFromQueueResponse = void;

/**
 * RemoveFromQueue action
 *
 * Bound action
 * Binding parameter: entity (mscrm.queueitem)
 *
 * The first argument is the id of the queueitem record to call it on.
 */
export class RemoveFromQueueAction implements Executable<RemoveFromQueueResponse> {
  constructor(public readonly queueitemId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queueitems(${odataLiteral.guid(this.queueitemId)})/Microsoft.Dynamics.CRM.RemoveFromQueue`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<RemoveFromQueueResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
