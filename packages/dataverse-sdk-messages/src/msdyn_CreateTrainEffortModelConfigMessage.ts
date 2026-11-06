import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CreateTrainEffortModelConfigResponse as msdyn_CreateTrainEffortModelConfigResponseData } from "./types/index.js";

/**
 * msdyn_CreateTrainEffortModelConfig request message
 *
 * Web API Action: msdyn_CreateTrainEffortModelConfig
 */
export class msdyn_CreateTrainEffortModelConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateTrainEffortModelConfigResponse>
{
  constructor(
    public entityLogicalName: string,
    public recordId: string,
    public dataBinding: string,
    public customConfig: string
  ) {
    super("msdyn_CreateTrainEffortModelConfig");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateTrainEffortModelConfig`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
      RecordId: this.recordId,
      DataBinding: this.dataBinding,
      CustomConfig: this.customConfig,
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

  async parseResponse(response: Response): Promise<msdyn_CreateTrainEffortModelConfigResponse> {
    const data = await response.json();
    return msdyn_CreateTrainEffortModelConfigResponse.fromResponse(data);
  }
}

/**
 * msdyn_CreateTrainEffortModelConfig response message
 */
export class msdyn_CreateTrainEffortModelConfigResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateTrainEffortModelConfigResponseData) {
    super("msdyn_CreateTrainEffortModelConfig");
  }

  static fromResponse(data: unknown): msdyn_CreateTrainEffortModelConfigResponse {
    return new msdyn_CreateTrainEffortModelConfigResponse(
      responseObject<msdyn_CreateTrainEffortModelConfigResponseData>(data)
    );
  }
}
