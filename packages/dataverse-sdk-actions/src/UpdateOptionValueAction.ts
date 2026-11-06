import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { Label } from "./types/index.js";

/**
 * Response from UpdateOptionValue action
 */
export interface UpdateOptionValueResponse {
  // No content returned
}

/**
 * Parameters of the UpdateOptionValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateOptionValueActionParameters {
  Color?: string;
  OptionSetName?: string;
  AttributeLogicalName?: string;
  ExternalValue?: string;
  EntityLogicalName?: string;
  IsHidden?: boolean;
  Value: number;
  Label?: Label;
  Description?: Label;
  MergeLabels: boolean;
  ParentValues?: number[];
  SolutionUniqueName?: string;
}

/**
 * UpdateOptionValue action
 *
 * Unbound action
 */
export class UpdateOptionValueAction implements Executable<UpdateOptionValueResponse> {
  constructor(public readonly parameters: UpdateOptionValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateOptionValue`;

    const body = requestBody({
      Color: this.parameters.Color,
      OptionSetName: this.parameters.OptionSetName,
      AttributeLogicalName: this.parameters.AttributeLogicalName,
      ExternalValue: this.parameters.ExternalValue,
      EntityLogicalName: this.parameters.EntityLogicalName,
      IsHidden: this.parameters.IsHidden,
      Value: this.parameters.Value,
      Label: this.parameters.Label,
      Description: this.parameters.Description,
      MergeLabels: this.parameters.MergeLabels,
      ParentValues: this.parameters.ParentValues,
      SolutionUniqueName: this.parameters.SolutionUniqueName,
    });

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as UpdateOptionValueResponse;
  }
}
