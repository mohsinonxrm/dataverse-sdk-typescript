import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from SetProcess action
 */
export interface SetProcessResponse {
  // No content returned
}

/**
 * SetProcess action
 *
 * Unbound action
 */
export class SetProcessAction implements Executable<SetProcessResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly newProcess: EntityReference,
    public readonly newProcessInstance: EntityReference
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetProcess`;

    const body: Record<string, unknown> = {
      Target: this.target,
      NewProcess: this.newProcess,
      NewProcessInstance: this.newProcessInstance,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<SetProcessResponse> {
    // No return value (204 No Content)
    return {};
  }
}
