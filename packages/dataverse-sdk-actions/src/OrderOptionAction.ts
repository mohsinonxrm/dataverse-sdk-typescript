import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from OrderOption action
 */
export interface OrderOptionResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<OrderOptionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as OrderOptionResponse;
  }
}
