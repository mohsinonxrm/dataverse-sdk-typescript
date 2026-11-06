import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_SearchResourceAvailabilityForRequirementGroupResponse as msdyn_SearchResourceAvailabilityForRequirementGroupResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SearchResourceAvailabilityForRequirementGroup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SearchResourceAvailabilityForRequirementGroupRequestParameters {
  Version?: string;
  IsWebApi?: boolean;
  RequirementGroup: EntityReference | AnyEntityPayload;
  RequirementSpecification?: EntityReference | AnyEntityPayload;
  Settings?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SearchResourceAvailabilityForRequirementGroup request message
 *
 * Web API Action: msdyn_SearchResourceAvailabilityForRequirementGroup
 */
export class msdyn_SearchResourceAvailabilityForRequirementGroupRequest
  extends OrganizationRequest
  implements Executable<msdyn_SearchResourceAvailabilityForRequirementGroupResponse>
{
  declare readonly Parameters: Readonly<msdyn_SearchResourceAvailabilityForRequirementGroupRequestParameters>;

  constructor(parameters: msdyn_SearchResourceAvailabilityForRequirementGroupRequestParameters) {
    super("msdyn_SearchResourceAvailabilityForRequirementGroup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SearchResourceAvailabilityForRequirementGroup`;

    const body = requestBody({
      Version: this.Parameters.Version,
      IsWebApi: this.Parameters.IsWebApi,
      RequirementGroup: this.Parameters.RequirementGroup,
      RequirementSpecification: this.Parameters.RequirementSpecification,
      Settings: this.Parameters.Settings,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SearchResourceAvailabilityForRequirementGroupResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SearchResourceAvailabilityForRequirementGroupResponse.fromResponse({});
    return msdyn_SearchResourceAvailabilityForRequirementGroupResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SearchResourceAvailabilityForRequirementGroup response message
 */
export class msdyn_SearchResourceAvailabilityForRequirementGroupResponse extends OrganizationResponse {
  constructor(public result: msdyn_SearchResourceAvailabilityForRequirementGroupResponseData) {
    super("msdyn_SearchResourceAvailabilityForRequirementGroup");
  }

  static fromResponse(data: unknown): msdyn_SearchResourceAvailabilityForRequirementGroupResponse {
    return new msdyn_SearchResourceAvailabilityForRequirementGroupResponse(
      responseObject<msdyn_SearchResourceAvailabilityForRequirementGroupResponseData>(data)
    );
  }
}
