import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the RotateGroupKey action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RotateGroupKeyResponse = void;

/**
 * RotateGroupKey action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowmachinegroup)
 *
 * The first argument is the id of the flowmachinegroup record to call it on.
 */
export class RotateGroupKeyAction implements Executable<RotateGroupKeyResponse> {
  constructor(public readonly flowmachinegroupId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinegroups(${odataLiteral.guid(this.flowmachinegroupId)})/Microsoft.Dynamics.CRM.RotateGroupKey`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<RotateGroupKeyResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
