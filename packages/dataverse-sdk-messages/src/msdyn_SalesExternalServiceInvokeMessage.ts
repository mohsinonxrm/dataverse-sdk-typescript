import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesExternalServiceInvokeResponse as msdyn_SalesExternalServiceInvokeResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesExternalServiceInvoke message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesExternalServiceInvokeRequestParameters {
  msdyn_entityName: string;
  msdyn_activityId?: string;
  msdyn_id: string;
}

/**
 * msdyn_SalesExternalServiceInvoke request message
 *
 * Web API Action: msdyn_SalesExternalServiceInvoke
 */
export class msdyn_SalesExternalServiceInvokeRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesExternalServiceInvokeResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesExternalServiceInvokeRequestParameters>;

  constructor(parameters: msdyn_SalesExternalServiceInvokeRequestParameters) {
    super("msdyn_SalesExternalServiceInvoke", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesExternalServiceInvoke`;

    const body = requestBody({
      msdyn_entityName: this.Parameters.msdyn_entityName,
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_id: this.Parameters.msdyn_id,
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

  async parseResponse(response: Response): Promise<msdyn_SalesExternalServiceInvokeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SalesExternalServiceInvokeResponse.fromResponse({});
    return msdyn_SalesExternalServiceInvokeResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesExternalServiceInvoke response message
 */
export class msdyn_SalesExternalServiceInvokeResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesExternalServiceInvokeResponseData) {
    super("msdyn_SalesExternalServiceInvoke");
  }

  static fromResponse(data: unknown): msdyn_SalesExternalServiceInvokeResponse {
    return new msdyn_SalesExternalServiceInvokeResponse(
      responseObject<msdyn_SalesExternalServiceInvokeResponseData>(data)
    );
  }
}
