import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CreateAutonomousEmailWrapperResponse as msdyn_CreateAutonomousEmailWrapperResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateAutonomousEmailWrapper message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateAutonomousEmailWrapperRequestParameters {
  SourceContextEntity?: EntityReference | AnyEntityPayload;
  Entity: EntityReference | AnyEntityPayload;
  NextSuggestion: string;
  SenderEntity?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_CreateAutonomousEmailWrapper request message
 *
 * Web API Action: msdyn_CreateAutonomousEmailWrapper
 */
export class msdyn_CreateAutonomousEmailWrapperRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateAutonomousEmailWrapperResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateAutonomousEmailWrapperRequestParameters>;

  constructor(parameters: msdyn_CreateAutonomousEmailWrapperRequestParameters) {
    super("msdyn_CreateAutonomousEmailWrapper", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAutonomousEmailWrapper`;

    const body = requestBody({
      SourceContextEntity: this.Parameters.SourceContextEntity,
      Entity: this.Parameters.Entity,
      NextSuggestion: this.Parameters.NextSuggestion,
      SenderEntity: this.Parameters.SenderEntity,
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

  async parseResponse(response: Response): Promise<msdyn_CreateAutonomousEmailWrapperResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CreateAutonomousEmailWrapperResponse.fromResponse({});
    return msdyn_CreateAutonomousEmailWrapperResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CreateAutonomousEmailWrapper response message
 */
export class msdyn_CreateAutonomousEmailWrapperResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateAutonomousEmailWrapperResponseData) {
    super("msdyn_CreateAutonomousEmailWrapper");
  }

  static fromResponse(data: unknown): msdyn_CreateAutonomousEmailWrapperResponse {
    return new msdyn_CreateAutonomousEmailWrapperResponse(
      responseObject<msdyn_CreateAutonomousEmailWrapperResponseData>(data)
    );
  }
}
