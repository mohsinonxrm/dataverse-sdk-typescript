import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetDynamicFieldsForActionTypeResponse as msdyn_GetDynamicFieldsForActionTypeResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetDynamicFieldsForActionType message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetDynamicFieldsForActionTypeRequestParameters {
  correlationId: string;
  workflowId: string;
  secondaryActionType: string;
  actionType: string;
}

/**
 * msdyn_GetDynamicFieldsForActionType request message
 *
 * Web API Action: msdyn_GetDynamicFieldsForActionType
 */
export class msdyn_GetDynamicFieldsForActionTypeRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetDynamicFieldsForActionTypeResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetDynamicFieldsForActionTypeRequestParameters>;

  constructor(parameters: msdyn_GetDynamicFieldsForActionTypeRequestParameters) {
    super("msdyn_GetDynamicFieldsForActionType", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDynamicFieldsForActionType`;

    const body = requestBody({
      correlationId: this.Parameters.correlationId,
      workflowId: this.Parameters.workflowId,
      secondaryActionType: this.Parameters.secondaryActionType,
      actionType: this.Parameters.actionType,
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

  async parseResponse(response: Response): Promise<msdyn_GetDynamicFieldsForActionTypeResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetDynamicFieldsForActionTypeResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetDynamicFieldsForActionType response message
 */
export class msdyn_GetDynamicFieldsForActionTypeResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetDynamicFieldsForActionTypeResponseData) {
    super("msdyn_GetDynamicFieldsForActionType");
  }

  static fromResponse(data: unknown): msdyn_GetDynamicFieldsForActionTypeResponse {
    return new msdyn_GetDynamicFieldsForActionTypeResponse(
      responseObject<msdyn_GetDynamicFieldsForActionTypeResponseData>(data)
    );
  }
}
