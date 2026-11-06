import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetSankeyViewKPIsResponse as msdyn_GetSankeyViewKPIsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetSankeyViewKPIs message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSankeyViewKPIsRequestParameters {
  ActionIds: string;
  SequenceId: string;
  RegardingEntityName: string;
}

/**
 * msdyn_GetSankeyViewKPIs request message
 *
 * Web API Action: msdyn_GetSankeyViewKPIs
 */
export class msdyn_GetSankeyViewKPIsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSankeyViewKPIsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSankeyViewKPIsRequestParameters>;

  constructor(parameters: msdyn_GetSankeyViewKPIsRequestParameters) {
    super("msdyn_GetSankeyViewKPIs", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSankeyViewKPIs`;

    const body = requestBody({
      ActionIds: this.Parameters.ActionIds,
      SequenceId: this.Parameters.SequenceId,
      RegardingEntityName: this.Parameters.RegardingEntityName,
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

  async parseResponse(response: Response): Promise<msdyn_GetSankeyViewKPIsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetSankeyViewKPIsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetSankeyViewKPIs response message
 */
export class msdyn_GetSankeyViewKPIsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSankeyViewKPIsResponseData) {
    super("msdyn_GetSankeyViewKPIs");
  }

  static fromResponse(data: unknown): msdyn_GetSankeyViewKPIsResponse {
    return new msdyn_GetSankeyViewKPIsResponse(
      responseObject<msdyn_GetSankeyViewKPIsResponseData>(data)
    );
  }
}
