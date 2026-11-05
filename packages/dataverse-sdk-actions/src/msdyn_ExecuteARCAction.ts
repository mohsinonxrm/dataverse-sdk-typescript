import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_ExecuteARC action
 */
export interface msdyn_ExecuteARCResponse {
  FlowName: string;
  ErrorMessage: string;
}

/**
 * msdyn_ExecuteARC action
 *
 * Unbound action
 */
export class msdyn_ExecuteARCAction implements Executable<msdyn_ExecuteARCResponse> {
  constructor(
    public readonly createdEntityReference: EntityReference,
    public readonly ruleId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteARC`;

    const body: Record<string, unknown> = {
      CreatedEntityReference: this.createdEntityReference,
      RuleId: this.ruleId,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteARCResponse> {
    const data = await response.json();
    return data as msdyn_ExecuteARCResponse;
  }
}
