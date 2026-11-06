import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_ocsimltraining } from "./types/index.js";

/**
 * msdyn_CreateTrainConfig request message
 *
 * Web API Action: msdyn_CreateTrainConfig
 *
 * The first argument is the id of the msdyn_ocskillidentmlmodel record to call it on.
 */
export class msdyn_CreateTrainConfigRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateTrainConfigResponse>
{
  constructor(public msdyn_ocskillidentmlmodelId: string) {
    super("msdyn_CreateTrainConfig");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocskillidentmlmodels(${this.msdyn_ocskillidentmlmodelId})/Microsoft.Dynamics.CRM.msdyn_CreateTrainConfig`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CreateTrainConfigResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return msdyn_CreateTrainConfigResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_CreateTrainConfigResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateTrainConfig action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_CreateTrainConfigResult =
  | (msdyn_ocsimltraining & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * msdyn_CreateTrainConfig response message
 *
 * `result` is the value the msdyn_CreateTrainConfig action returns (see {@link msdyn_CreateTrainConfigResult}).
 */
export class msdyn_CreateTrainConfigResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateTrainConfigResult) {
    super("msdyn_CreateTrainConfig");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateTrainConfigResponse {
    return new msdyn_CreateTrainConfigResponse((data ?? null) as msdyn_CreateTrainConfigResult);
  }
}
