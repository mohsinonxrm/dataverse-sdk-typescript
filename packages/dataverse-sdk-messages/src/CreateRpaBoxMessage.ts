import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { CreateRpaBoxResponse as CreateRpaBoxResponseData } from "./types/index.js";

/**
 * Parameters of the CreateRpaBox message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateRpaBoxRequestParameters {
  machineDescription?: string;
  machineNetworkId?: EntityReference | AnyEntityPayload;
  machineName: string;
  machineImageVersionId: EntityReference | AnyEntityPayload;
}

/**
 * CreateRpaBox request message
 *
 * Web API Action: CreateRpaBox
 */
export class CreateRpaBoxRequest
  extends OrganizationRequest
  implements Executable<CreateRpaBoxResponse>
{
  declare readonly Parameters: Readonly<CreateRpaBoxRequestParameters>;

  constructor(parameters: CreateRpaBoxRequestParameters) {
    super("CreateRpaBox", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateRpaBox`;

    const body = requestBody({
      machineDescription: this.Parameters.machineDescription,
      machineNetworkId: this.Parameters.machineNetworkId,
      machineName: this.Parameters.machineName,
      machineImageVersionId: this.Parameters.machineImageVersionId,
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

  async parseResponse(response: Response): Promise<CreateRpaBoxResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CreateRpaBoxResponse.fromResponse({});
    return CreateRpaBoxResponse.fromResponse(await response.json());
  }
}

/**
 * CreateRpaBox response message
 */
export class CreateRpaBoxResponse extends OrganizationResponse {
  constructor(public result: CreateRpaBoxResponseData) {
    super("CreateRpaBox");
  }

  static fromResponse(data: unknown): CreateRpaBoxResponse {
    return new CreateRpaBoxResponse(responseObject<CreateRpaBoxResponseData>(data));
  }
}
