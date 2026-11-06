import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { Label } from "./types/index.js";

/**
 * Response from InsertOptionValue action
 */
export interface InsertOptionValueResponse {
  NewOptionValue: number;
}

/**
 * Parameters of the InsertOptionValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InsertOptionValueActionParameters {
  Color?: string;
  OptionSetName?: string;
  AttributeLogicalName?: string;
  ExternalValue?: string;
  EntityLogicalName?: string;
  IsHidden?: boolean;
  Value?: number;
  Label?: Label;
  Description?: Label;
  ParentValues?: number[];
  SolutionUniqueName?: string;
}

/**
 * InsertOptionValue action
 *
 * Unbound action
 */
export class InsertOptionValueAction implements Executable<InsertOptionValueResponse> {
  constructor(public readonly parameters: InsertOptionValueActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InsertOptionValue`;

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

  async parseResponse(response: Response): Promise<InsertOptionValueResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as InsertOptionValueResponse;
    return (await response.json()) as InsertOptionValueResponse;
  }
}
