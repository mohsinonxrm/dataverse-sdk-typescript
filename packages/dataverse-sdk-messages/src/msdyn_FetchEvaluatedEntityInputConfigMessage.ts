import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_FetchEvaluatedEntityInputConfigResponse as msdyn_FetchEvaluatedEntityInputConfigResponseData } from "./types/index.js";

/**
 * msdyn_FetchEvaluatedEntityInputConfig request message
 *
 * Web API Action: msdyn_FetchEvaluatedEntityInputConfig
 */
export class msdyn_FetchEvaluatedEntityInputConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchEvaluatedEntityInputConfigResponse>
{
  constructor(
    public regardingEntityId: string,
    public regardingEntityLogicalName: string
  ) {
    super("msdyn_FetchEvaluatedEntityInputConfig");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchEvaluatedEntityInputConfig`;

    const body: Record<string, unknown> = {
      regardingEntityId: this.regardingEntityId,
      regardingEntityLogicalName: this.regardingEntityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_FetchEvaluatedEntityInputConfigResponse> {
    const data = await response.json();
    return msdyn_FetchEvaluatedEntityInputConfigResponse.fromResponse(data);
  }
}

/**
 * msdyn_FetchEvaluatedEntityInputConfig response message
 */
export class msdyn_FetchEvaluatedEntityInputConfigResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchEvaluatedEntityInputConfigResponseData) {
    super("msdyn_FetchEvaluatedEntityInputConfig");
  }

  static fromResponse(data: unknown): msdyn_FetchEvaluatedEntityInputConfigResponse {
    return new msdyn_FetchEvaluatedEntityInputConfigResponse(
      responseObject<msdyn_FetchEvaluatedEntityInputConfigResponseData>(data)
    );
  }
}
