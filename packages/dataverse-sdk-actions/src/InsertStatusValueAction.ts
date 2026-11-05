import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { Label } from "./types/index.js";

/**
 * Response from InsertStatusValue action
 */
export interface InsertStatusValueResponse {
  NewOptionValue: number;
}

/**
 * InsertStatusValue action
 *
 * Unbound action
 */
export class InsertStatusValueAction implements Executable<InsertStatusValueResponse> {
  constructor(
    public readonly color: string,
    public readonly optionSetName: string,
    public readonly attributeLogicalName: string,
    public readonly entityLogicalName: string,
    public readonly value: number,
    public readonly label: Label,
    public readonly description: Label,
    public readonly stateCode: number,
    public readonly solutionUniqueName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InsertStatusValue`;

    const body: Record<string, unknown> = {
      Color: this.color,
      OptionSetName: this.optionSetName,
      AttributeLogicalName: this.attributeLogicalName,
      EntityLogicalName: this.entityLogicalName,
      Value: this.value,
      Label: this.label,
      Description: this.description,
      StateCode: this.stateCode,
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

  async parseResponse(response: Response): Promise<InsertStatusValueResponse> {
    const data = await response.json();
    return data as InsertStatusValueResponse;
  }
}
