import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CreateWorkOrderResponse as msdyn_CreateWorkOrderResponseData } from "./types/index.js";

/**
 * msdyn_CreateWorkOrder request message
 *
 * Web API Action: msdyn_CreateWorkOrder
 */
export class msdyn_CreateWorkOrderRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateWorkOrderResponse>
{
  constructor(public input: string) {
    super("msdyn_CreateWorkOrder");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateWorkOrder`;

    const body: Record<string, unknown> = {
      input: this.input,
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

  async parseResponse(response: Response): Promise<msdyn_CreateWorkOrderResponse> {
    const data = await response.json();
    return msdyn_CreateWorkOrderResponse.fromResponse(data);
  }
}

/**
 * msdyn_CreateWorkOrder response message
 */
export class msdyn_CreateWorkOrderResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateWorkOrderResponseData) {
    super("msdyn_CreateWorkOrder");
  }

  static fromResponse(data: unknown): msdyn_CreateWorkOrderResponse {
    return new msdyn_CreateWorkOrderResponse(
      responseObject<msdyn_CreateWorkOrderResponseData>(data)
    );
  }
}
