import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { Label } from "./types/index.js";

/**
 * Response from UpdateOptionValue action
 */
export interface UpdateOptionValueResponse {
  // No content returned
}

/**
 * UpdateOptionValue action
 *
 * Unbound action
 */
export class UpdateOptionValueAction implements Executable<UpdateOptionValueResponse> {
  constructor(
    public readonly color: string | undefined,
    public readonly optionSetName: string | undefined,
    public readonly attributeLogicalName: string | undefined,
    public readonly externalValue: string | undefined,
    public readonly entityLogicalName: string | undefined,
    public readonly isHidden: boolean | undefined,
    public readonly value: number,
    public readonly label: Label | undefined,
    public readonly description: Label | undefined,
    public readonly mergeLabels: boolean,
    public readonly parentValues?: number[],
    public readonly solutionUniqueName?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateOptionValue`;

    const body: Record<string, unknown> = {
      Color: this.color,
      OptionSetName: this.optionSetName,
      AttributeLogicalName: this.attributeLogicalName,
      ExternalValue: this.externalValue,
      EntityLogicalName: this.entityLogicalName,
      IsHidden: this.isHidden,
      Value: this.value,
      Label: this.label,
      Description: this.description,
      MergeLabels: this.mergeLabels,
      ParentValues: this.parentValues,
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

  async parseResponse(response: Response): Promise<UpdateOptionValueResponse> {
    // No return value (204 No Content)
    return {};
  }
}
