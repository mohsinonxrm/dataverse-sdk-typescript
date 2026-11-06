import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the DeleteOptionValue action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type DeleteOptionValueResponse = void;

/**
 * Parameters of the DeleteOptionValue action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteOptionValueActionParameters {
  OptionSetName?: string;
  AttributeLogicalName?: string;
  EntityLogicalName?: string;
  Value: number;
  SolutionUniqueName?: string;
}

/**
 * DeleteOptionValue action
 *
 * Unbound action
 */
export class DeleteOptionValueAction implements Executable<DeleteOptionValueResponse> {
  constructor(public readonly parameters: DeleteOptionValueActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteOptionValue`;

    const body = requestBody({
      OptionSetName: this.parameters.OptionSetName,
      AttributeLogicalName: this.parameters.AttributeLogicalName,
      EntityLogicalName: this.parameters.EntityLogicalName,
      Value: this.parameters.Value,
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

  parseResponse(_response: Response): Promise<DeleteOptionValueResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
