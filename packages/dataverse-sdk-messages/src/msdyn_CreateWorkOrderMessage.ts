import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateWorkOrderResponse as msdyn_CreateWorkOrderResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateWorkOrder message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateWorkOrderRequestParameters {
  input: string;
}

/**
 * msdyn_CreateWorkOrder request message
 *
 * Web API Action: msdyn_CreateWorkOrder
 */
export class msdyn_CreateWorkOrderRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateWorkOrderResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateWorkOrderRequestParameters>;

  constructor(parameters: msdyn_CreateWorkOrderRequestParameters) {
    super("msdyn_CreateWorkOrder", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateWorkOrder`;

    const body = requestBody({
      input: this.Parameters.input,
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

  async parseResponse(response: Response): Promise<msdyn_CreateWorkOrderResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CreateWorkOrderResponse.fromResponse(text ? JSON.parse(text) : {});
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
