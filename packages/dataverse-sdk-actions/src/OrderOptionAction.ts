import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from OrderOption action
 */
export interface OrderOptionResponse {
  // No content returned
}

/**
 * OrderOption action
 *
 * Unbound action
 */
export class OrderOptionAction implements Executable<OrderOptionResponse> {
  constructor(
    public readonly optionSetName: string | undefined,
    public readonly attributeLogicalName: string | undefined,
    public readonly entityLogicalName: string | undefined,
    public readonly values: number[],
    public readonly solutionUniqueName?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OrderOption`;

    const body: Record<string, unknown> = {
      OptionSetName: this.optionSetName,
      AttributeLogicalName: this.attributeLogicalName,
      EntityLogicalName: this.entityLogicalName,
      Values: this.values,
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

  async parseResponse(response: Response): Promise<OrderOptionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
