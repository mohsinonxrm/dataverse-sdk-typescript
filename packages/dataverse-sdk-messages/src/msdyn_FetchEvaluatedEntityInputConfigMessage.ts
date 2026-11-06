import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_FetchEvaluatedEntityInputConfigResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_FetchEvaluatedEntityInputConfig action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FetchEvaluatedEntityInputConfigResult {
  "@odata.context"?: string;
  Representative: string;
  entity_data: string;
}

/**
 * msdyn_FetchEvaluatedEntityInputConfig response message
 *
 * `result` is the value the msdyn_FetchEvaluatedEntityInputConfig action returns (see {@link msdyn_FetchEvaluatedEntityInputConfigResult}).
 */
export class msdyn_FetchEvaluatedEntityInputConfigResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchEvaluatedEntityInputConfigResult) {
    super("msdyn_FetchEvaluatedEntityInputConfig");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_FetchEvaluatedEntityInputConfigResponse {
    return new msdyn_FetchEvaluatedEntityInputConfigResponse(
      data as msdyn_FetchEvaluatedEntityInputConfigResult
    );
  }
}
