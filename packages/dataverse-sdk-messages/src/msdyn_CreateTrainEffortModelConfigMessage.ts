import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CreateTrainEffortModelConfig message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateTrainEffortModelConfigRequestParameters {
  EntityLogicalName: string;
  RecordId: string;
  DataBinding: string;
  CustomConfig: string;
}

/**
 * msdyn_CreateTrainEffortModelConfig request message
 *
 * Web API Action: msdyn_CreateTrainEffortModelConfig
 */
export class msdyn_CreateTrainEffortModelConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateTrainEffortModelConfigResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateTrainEffortModelConfigRequestParameters>;

  constructor(parameters: msdyn_CreateTrainEffortModelConfigRequestParameters) {
    super("msdyn_CreateTrainEffortModelConfig", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateTrainEffortModelConfig`;

    const body = requestBody({
      EntityLogicalName: this.Parameters.EntityLogicalName,
      RecordId: this.Parameters.RecordId,
      DataBinding: this.Parameters.DataBinding,
      CustomConfig: this.Parameters.CustomConfig,
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

  async parseResponse(response: Response): Promise<msdyn_CreateTrainEffortModelConfigResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CreateTrainEffortModelConfigResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateTrainEffortModelConfig action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateTrainEffortModelConfigResult {
  "@odata.context"?: string;
  TrainConfig: string;
}

/**
 * msdyn_CreateTrainEffortModelConfig response message
 *
 * `result` is the value the msdyn_CreateTrainEffortModelConfig action returns (see {@link msdyn_CreateTrainEffortModelConfigResult}).
 */
export class msdyn_CreateTrainEffortModelConfigResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateTrainEffortModelConfigResult) {
    super("msdyn_CreateTrainEffortModelConfig");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateTrainEffortModelConfigResponse {
    return new msdyn_CreateTrainEffortModelConfigResponse(
      data as msdyn_CreateTrainEffortModelConfigResult
    );
  }
}
