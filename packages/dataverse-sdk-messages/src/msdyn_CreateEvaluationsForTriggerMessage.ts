import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateEvaluationsForTriggerResponse as msdyn_CreateEvaluationsForTriggerResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateEvaluationsForTrigger message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateEvaluationsForTriggerRequestParameters {
  msdyn_EvaluationTrigger: string;
  msdyn_EntityLogicalName: string;
  msdyn_EntityId: string;
}

/**
 * msdyn_CreateEvaluationsForTrigger request message
 *
 * Web API Action: msdyn_CreateEvaluationsForTrigger
 */
export class msdyn_CreateEvaluationsForTriggerRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateEvaluationsForTriggerResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateEvaluationsForTriggerRequestParameters>;

  constructor(parameters: msdyn_CreateEvaluationsForTriggerRequestParameters) {
    super("msdyn_CreateEvaluationsForTrigger", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateEvaluationsForTrigger`;

    const body = requestBody({
      msdyn_EvaluationTrigger: this.Parameters.msdyn_EvaluationTrigger,
      msdyn_EntityLogicalName: this.Parameters.msdyn_EntityLogicalName,
      msdyn_EntityId: this.Parameters.msdyn_EntityId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateEvaluationsForTriggerResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CreateEvaluationsForTriggerResponse.fromResponse({});
    return msdyn_CreateEvaluationsForTriggerResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CreateEvaluationsForTrigger response message
 */
export class msdyn_CreateEvaluationsForTriggerResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateEvaluationsForTriggerResponseData) {
    super("msdyn_CreateEvaluationsForTrigger");
  }

  static fromResponse(data: unknown): msdyn_CreateEvaluationsForTriggerResponse {
    return new msdyn_CreateEvaluationsForTriggerResponse(
      responseObject<msdyn_CreateEvaluationsForTriggerResponseData>(data)
    );
  }
}
