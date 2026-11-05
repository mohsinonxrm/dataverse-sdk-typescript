import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesExternalServiceInvoke request message
 *
 * Web API Action: msdyn_SalesExternalServiceInvoke
 */
export class msdyn_SalesExternalServiceInvokeRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesExternalServiceInvokeResponse>
{
  constructor(
    public msdyn_entityName: string,
    public msdyn_activityId: string,
    public msdyn_id: string
  ) {
    super("msdyn_SalesExternalServiceInvoke");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesExternalServiceInvoke`;

    const body: Record<string, unknown> = {
      msdyn_entityName: this.msdyn_entityName,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_id: this.msdyn_id,
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

  async parseResponse(response: Response): Promise<msdyn_SalesExternalServiceInvokeResponse> {
    const data = await response.json();
    return msdyn_SalesExternalServiceInvokeResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_entityName: this.msdyn_entityName,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_id: this.msdyn_id,
    };
  }
}

/**
 * msdyn_SalesExternalServiceInvoke response message
 */
export class msdyn_SalesExternalServiceInvokeResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesExternalServiceInvokeResponse) {
    super("msdyn_SalesExternalServiceInvoke");
  }

  static fromResponse(data: unknown): msdyn_SalesExternalServiceInvokeResponse {
    return new msdyn_SalesExternalServiceInvokeResponse((data as any).value);
  }
}
