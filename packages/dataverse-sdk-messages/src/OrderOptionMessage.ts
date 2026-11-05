import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * OrderOption request message
 *
 * Web API Action: OrderOption
 */
export class OrderOptionRequest
  extends OrganizationRequest
  implements Executable<OrderOptionResponse>
{
  constructor(
    public optionSetName: string,
    public attributeLogicalName: string,
    public entityLogicalName: string,
    public values: number[],
    public solutionUniqueName: string
  ) {
    super("OrderOption");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/OrderOption`;

    const body: Record<string, unknown> = {
      OptionSetName: this.optionSetName,
      AttributeLogicalName: this.attributeLogicalName,
      EntityLogicalName: this.entityLogicalName,
      Values: this.values,
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
