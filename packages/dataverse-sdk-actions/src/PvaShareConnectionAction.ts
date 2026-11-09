import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the PvaShareConnection action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type PvaShareConnectionResponse = void;

/**
 * PvaShareConnection action
 *
 * Bound action
 * Binding parameter: entity (mscrm.connectionreference)
 *
 * The first argument is the id of the connectionreference record to call it on.
 */
export class PvaShareConnectionAction implements Executable<PvaShareConnectionResponse> {
  constructor(public readonly connectionreferenceId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/connectionreferences(${odataLiteral.guid(this.connectionreferenceId)})/Microsoft.Dynamics.CRM.PvaShareConnection`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<PvaShareConnectionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
