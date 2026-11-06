import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { Label } from "./types/index.js";

/**
 * Response from InsertStatusValue action
 */
export interface InsertStatusValueResponse {
  NewOptionValue: number;
}

/**
 * Parameters of the InsertStatusValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface InsertStatusValueActionParameters {
  Color?: string;
  OptionSetName?: string;
  AttributeLogicalName?: string;
  EntityLogicalName?: string;
  Value?: number;
  Label?: Label;
  Description?: Label;
  StateCode: number;
  SolutionUniqueName?: string;
}

/**
 * InsertStatusValue action
 *
 * Unbound action
 */
export class InsertStatusValueAction implements Executable<InsertStatusValueResponse> {
  constructor(public readonly parameters: InsertStatusValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/InsertStatusValue`;

    const body = requestBody({
      Color: this.parameters.Color,
      OptionSetName: this.parameters.OptionSetName,
      AttributeLogicalName: this.parameters.AttributeLogicalName,
      EntityLogicalName: this.parameters.EntityLogicalName,
      Value: this.parameters.Value,
      Label: this.parameters.Label,
      Description: this.parameters.Description,
      StateCode: this.parameters.StateCode,
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

  async parseResponse(response: Response): Promise<InsertStatusValueResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as InsertStatusValueResponse;
  }
}
