import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { queueitem } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckARCDependencies message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckARCDependenciesRequestParameters {
  msdyn_Activity: EntityReference | AnyEntityPayload;
  msdyn_QueueItem: EntityReference | EntityPayload<queueitem>;
}

/**
 * msdyn_CheckARCDependencies request message
 *
 * Web API Action: msdyn_CheckARCDependencies
 */
export class msdyn_CheckARCDependenciesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckARCDependenciesResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckARCDependenciesRequestParameters>;

  constructor(parameters: msdyn_CheckARCDependenciesRequestParameters) {
    super("msdyn_CheckARCDependencies", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckARCDependencies`;

    const body = requestBody({
      msdyn_Activity: this.Parameters.msdyn_Activity,
      msdyn_QueueItem: this.Parameters.msdyn_QueueItem,
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

  async parseResponse(response: Response): Promise<msdyn_CheckARCDependenciesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckARCDependenciesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckARCDependencies action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckARCDependenciesResult {
  "@odata.context"?: string;
  msdyn_AreDependenciesMet: boolean;
}

/**
 * msdyn_CheckARCDependencies response message
 *
 * `result` is the value the msdyn_CheckARCDependencies action returns (see {@link msdyn_CheckARCDependenciesResult}).
 */
export class msdyn_CheckARCDependenciesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckARCDependenciesResult) {
    super("msdyn_CheckARCDependencies");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckARCDependenciesResponse {
    return new msdyn_CheckARCDependenciesResponse(data as msdyn_CheckARCDependenciesResult);
  }
}
