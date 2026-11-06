import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_UpdateEffortModelStatusResponse as msdyn_UpdateEffortModelStatusResponseData } from "./types/index.js";

/**
 * msdyn_UpdateEffortModelStatus request message
 *
 * Web API Action: msdyn_UpdateEffortModelStatus
 */
export class msdyn_UpdateEffortModelStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateEffortModelStatusResponse>
{
  constructor(
    public aiConfigId: string,
    public effortModelId: string
  ) {
    super("msdyn_UpdateEffortModelStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateEffortModelStatus`;

    const body: Record<string, unknown> = {
      AiConfigId: this.aiConfigId,
      EffortModelId: this.effortModelId,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateEffortModelStatusResponse> {
    const data = await response.json();
    return msdyn_UpdateEffortModelStatusResponse.fromResponse(data);
  }
}

/**
 * msdyn_UpdateEffortModelStatus response message
 */
export class msdyn_UpdateEffortModelStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateEffortModelStatusResponseData) {
    super("msdyn_UpdateEffortModelStatus");
  }

  static fromResponse(data: unknown): msdyn_UpdateEffortModelStatusResponse {
    return new msdyn_UpdateEffortModelStatusResponse(
      responseObject<msdyn_UpdateEffortModelStatusResponseData>(data)
    );
  }
}
