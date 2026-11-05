import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DeleteOptionValue action
 */
export interface DeleteOptionValueResponse {
  // No content returned
}

/**
 * DeleteOptionValue action
 *
 * Unbound action
 */
export class DeleteOptionValueAction implements Executable<DeleteOptionValueResponse> {
  constructor(
    public readonly optionSetName: string,
    public readonly attributeLogicalName: string,
    public readonly entityLogicalName: string,
    public readonly value: number,
    public readonly solutionUniqueName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteOptionValue`;

    const body: Record<string, unknown> = {
      OptionSetName: this.optionSetName,
      AttributeLogicalName: this.attributeLogicalName,
      EntityLogicalName: this.entityLogicalName,
      Value: this.value,
      SolutionUniqueName: this.solutionUniqueName,
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

  async parseResponse(response: Response): Promise<DeleteOptionValueResponse> {
    // No return value (204 No Content)
    return {};
  }
}
