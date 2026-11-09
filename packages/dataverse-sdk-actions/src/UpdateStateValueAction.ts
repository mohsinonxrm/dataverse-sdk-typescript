import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { Label } from "./types/index.js";

/**
 * Response from the UpdateStateValue action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UpdateStateValueResponse = void;

/**
 * Parameters of the UpdateStateValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateStateValueActionParameters {
  OptionSetName?: string;
  AttributeLogicalName?: string;
  EntityLogicalName?: string;
  Value: number;
  Label?: Label;
  Description?: Label;
  MergeLabels: boolean;
  DefaultStatusCode?: number;
}

/**
 * UpdateStateValue action
 *
 * Unbound action
 */
export class UpdateStateValueAction implements Executable<UpdateStateValueResponse> {
  constructor(public readonly parameters: UpdateStateValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateStateValue`;

    const body = requestBody({
      OptionSetName: this.parameters.OptionSetName,
      AttributeLogicalName: this.parameters.AttributeLogicalName,
      EntityLogicalName: this.parameters.EntityLogicalName,
      Value: this.parameters.Value,
      Label: this.parameters.Label,
      Description: this.parameters.Description,
      MergeLabels: this.parameters.MergeLabels,
      DefaultStatusCode: this.parameters.DefaultStatusCode,
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

  parseResponse(_response: Response): Promise<UpdateStateValueResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
