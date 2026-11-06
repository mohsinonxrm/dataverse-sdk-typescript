import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the OrderOption message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface OrderOptionRequestParameters {
  OptionSetName?: string;
  AttributeLogicalName?: string;
  EntityLogicalName?: string;
  Values: number[];
  SolutionUniqueName?: string;
}

/**
 * OrderOption request message
 *
 * Web API Action: OrderOption
 */
export class OrderOptionRequest
  extends OrganizationRequest
  implements Executable<OrderOptionResponse>
{
  declare readonly Parameters: Readonly<OrderOptionRequestParameters>;

  constructor(parameters: OrderOptionRequestParameters) {
    super("OrderOption", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OrderOption`;

    const body = requestBody({
      OptionSetName: this.Parameters.OptionSetName,
      AttributeLogicalName: this.Parameters.AttributeLogicalName,
      EntityLogicalName: this.Parameters.EntityLogicalName,
      Values: this.Parameters.Values,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
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
    // No return value (204 No Content)
    return new OrderOptionResponse();
  }
}

/**
 * OrderOption response message
 */
export class OrderOptionResponse extends OrganizationResponse {
  constructor() {
    super("OrderOption");
  }

  static fromResponse(_data: unknown): OrderOptionResponse {
    return new OrderOptionResponse();
  }
}
