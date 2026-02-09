import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { Label } from "./types/index.js";

/**
 * Response from InsertOptionValue action
 */
export interface InsertOptionValueResponse {
  NewOptionValue: number;
}

/**
 * InsertOptionValue action
 *
 * Unbound action
 */
export class InsertOptionValueAction implements Executable<InsertOptionValueResponse> {
  constructor(
    public readonly color: string,
    public readonly optionSetName: string,
    public readonly attributeLogicalName: string,
    public readonly externalValue: string,
    public readonly entityLogicalName: string,
    public readonly isHidden: boolean,
    public readonly value: number,
    public readonly label: Label,
    public readonly description: Label,
    public readonly parentValues: number[],
    public readonly solutionUniqueName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InsertOptionValue`;

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
      ParentValues: this.parentValues,
      SolutionUniqueName: this.solutionUniqueName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<InsertOptionValueResponse> {
    const data = await response.json();
    return data as InsertOptionValueResponse;
  }
}
