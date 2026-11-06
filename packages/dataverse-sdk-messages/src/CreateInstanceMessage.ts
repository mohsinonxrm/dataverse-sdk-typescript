import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the CreateInstance message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateInstanceRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  Count: number;
}

/**
 * CreateInstance request message
 *
 * Web API Action: CreateInstance
 */
export class CreateInstanceRequest
  extends OrganizationRequest
  implements Executable<CreateInstanceResponse>
{
  declare readonly Parameters: Readonly<CreateInstanceRequestParameters>;

  constructor(parameters: CreateInstanceRequestParameters) {
    super("CreateInstance", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateInstance`;

    const body = requestBody({
      Target: this.Parameters.Target,
      Count: this.Parameters.Count,
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

  async parseResponse(response: Response): Promise<CreateInstanceResponse> {
    // The body is the complex value, with its @odata.context
    return CreateInstanceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateInstance action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateInstanceResult {
  "@odata.context"?: string;
  SeriesCanBeExpanded: boolean;
}

/**
 * CreateInstance response message
 *
 * `result` is the value the CreateInstance action returns (see {@link CreateInstanceResult}).
 */
export class CreateInstanceResponse extends OrganizationResponse {
  constructor(public result: CreateInstanceResult) {
    super("CreateInstance");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateInstanceResponse {
    return new CreateInstanceResponse(data as CreateInstanceResult);
  }
}
