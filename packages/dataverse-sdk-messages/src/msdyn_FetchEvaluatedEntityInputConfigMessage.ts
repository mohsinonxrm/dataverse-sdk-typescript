import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FetchEvaluatedEntityInputConfigResponse as msdyn_FetchEvaluatedEntityInputConfigResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FetchEvaluatedEntityInputConfig message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchEvaluatedEntityInputConfigRequestParameters {
  regardingEntityLogicalName: string;
  regardingEntityId: string;
  ParticipantScope?: number;
}

/**
 * msdyn_FetchEvaluatedEntityInputConfig request message
 *
 * Web API Action: msdyn_FetchEvaluatedEntityInputConfig
 */
export class msdyn_FetchEvaluatedEntityInputConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchEvaluatedEntityInputConfigResponse>
{
  declare readonly Parameters: Readonly<msdyn_FetchEvaluatedEntityInputConfigRequestParameters>;

  constructor(parameters: msdyn_FetchEvaluatedEntityInputConfigRequestParameters) {
    super("msdyn_FetchEvaluatedEntityInputConfig", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchEvaluatedEntityInputConfig`;

    const body = requestBody({
      regardingEntityLogicalName: this.Parameters.regardingEntityLogicalName,
      regardingEntityId: this.Parameters.regardingEntityId,
      ParticipantScope: this.Parameters.ParticipantScope,
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

  async parseResponse(response: Response): Promise<msdyn_FetchEvaluatedEntityInputConfigResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_FetchEvaluatedEntityInputConfigResponse.fromResponse({});
    return msdyn_FetchEvaluatedEntityInputConfigResponse.fromResponse(await response.json());
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
