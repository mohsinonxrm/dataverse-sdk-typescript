import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return CreateRpaBoxResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateRpaBox action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateRpaBoxResult {
  "@odata.context"?: string;
  flowMachineId: string;
}

/**
 * CreateRpaBox response message
 *
 * `result` is the value the CreateRpaBox action returns (see {@link CreateRpaBoxResult}).
 */
export class CreateRpaBoxResponse extends OrganizationResponse {
  constructor(public result: CreateRpaBoxResult) {
    super("CreateRpaBox");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateRpaBoxResponse {
    return new CreateRpaBoxResponse(data as CreateRpaBoxResult);
  }
}
