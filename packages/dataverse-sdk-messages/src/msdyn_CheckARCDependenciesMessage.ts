import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_CheckARCDependenciesResponse as msdyn_CheckARCDependenciesResponseData,
  queueitem,
} from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CheckARCDependenciesResponse.fromResponse({});
    return msdyn_CheckARCDependenciesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckARCDependencies response message
 */
export class msdyn_CheckARCDependenciesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckARCDependenciesResponseData) {
    super("msdyn_CheckARCDependencies");
  }

  static fromResponse(data: unknown): msdyn_CheckARCDependenciesResponse {
    return new msdyn_CheckARCDependenciesResponse(
      responseObject<msdyn_CheckARCDependenciesResponseData>(data)
    );
  }
}
