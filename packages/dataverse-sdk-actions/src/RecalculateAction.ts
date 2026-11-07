import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the Recalculate action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RecalculateResponse = void;

/**
 * Recalculate action
 *
 * Bound action
 * Binding parameter: entity (mscrm.goal)
 *
 * The first argument is the id of the goal record to call it on.
 */
export class RecalculateAction implements Executable<RecalculateResponse> {
  constructor(public readonly goalId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/goals(${odataLiteral.guid(this.goalId)})/Microsoft.Dynamics.CRM.Recalculate`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<RecalculateResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
