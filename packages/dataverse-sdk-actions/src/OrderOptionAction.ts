import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the OrderOption action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type OrderOptionResponse = void;

/**
 * Parameters of the OrderOption action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OrderOptionActionParameters {
  OptionSetName?: string;
  AttributeLogicalName?: string;
  EntityLogicalName?: string;
  Values: number[];
  SolutionUniqueName?: string;
}

/**
 * OrderOption action
 *
 * Unbound action
 */
export class OrderOptionAction implements Executable<OrderOptionResponse> {
  constructor(public readonly parameters: OrderOptionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OrderOption`;

    const body = requestBody({
      OptionSetName: this.parameters.OptionSetName,
      AttributeLogicalName: this.parameters.AttributeLogicalName,
      EntityLogicalName: this.parameters.EntityLogicalName,
      Values: this.parameters.Values,
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

  parseResponse(_response: Response): Promise<OrderOptionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
