import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      input: this.input,
    };
  }
}

/**
 * msdyn_CreateWorkOrder response message
 */
export class msdyn_CreateWorkOrderResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateWorkOrderResponse) {
    super("msdyn_CreateWorkOrder");
  }

  static fromResponse(data: unknown): msdyn_CreateWorkOrderResponse {
    return new msdyn_CreateWorkOrderResponse((data as any).value);
  }
}
