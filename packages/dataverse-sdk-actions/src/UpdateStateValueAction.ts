import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { Label } from "./types/index.js";

/**
 * Response from UpdateStateValue action
 */
export interface UpdateStateValueResponse {
  // No content returned
}

/**
 * UpdateStateValue action
 *
 * Unbound action
 */
export class UpdateStateValueAction implements Executable<UpdateStateValueResponse> {
  constructor(
    public readonly optionSetName: string,
    public readonly attributeLogicalName: string,
    public readonly entityLogicalName: string,
    public readonly value: number,
    public readonly label: Label,
    public readonly description: Label,
    public readonly mergeLabels: boolean,
    public readonly defaultStatusCode: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateStateValue`;

    const body: Record<string, unknown> = {
      OptionSetName: this.optionSetName,
      AttributeLogicalName: this.attributeLogicalName,
      EntityLogicalName: this.entityLogicalName,
      Value: this.value,
      Label: this.label,
      Description: this.description,
      MergeLabels: this.mergeLabels,
      DefaultStatusCode: this.defaultStatusCode,
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

  async parseResponse(response: Response): Promise<UpdateStateValueResponse> {
    // No return value (204 No Content)
    return {};
  }
}
