import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CreateCustomActionDefinition action
 */
export interface msdyn_CreateCustomActionDefinitionResponse {
  actionDetails: string;
}

/**
 * msdyn_CreateCustomActionDefinition action
 *
 * Unbound action
 */
export class msdyn_CreateCustomActionDefinitionAction implements Executable<msdyn_CreateCustomActionDefinitionResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly entityName: string,
    public readonly customAction: string,
    public readonly customActionParams: string,
    public readonly correlationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateCustomActionDefinition`;

    const body: Record<string, unknown> = {
      workflowId: this.workflowId,
      entityName: this.entityName,
      customAction: this.customAction,
      customActionParams: this.customActionParams,
      correlationId: this.correlationId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateCustomActionDefinitionResponse> {
    const data = await response.json();
    return data as msdyn_CreateCustomActionDefinitionResponse;
  }
}
