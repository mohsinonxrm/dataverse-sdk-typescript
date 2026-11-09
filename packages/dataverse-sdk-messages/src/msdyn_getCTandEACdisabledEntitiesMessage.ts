import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_getCTandEACdisabledEntities message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_getCTandEACdisabledEntitiesRequestParameters {
  msdyn_entityList: string;
  msdyn_entityName: string;
}

/**
 * msdyn_getCTandEACdisabledEntities request message
 *
 * Web API Action: msdyn_getCTandEACdisabledEntities
 */
export class msdyn_getCTandEACdisabledEntitiesRequest
  extends OrganizationRequest
  implements Executable<msdyn_getCTandEACdisabledEntitiesResponse>
{
  declare readonly Parameters: Readonly<msdyn_getCTandEACdisabledEntitiesRequestParameters>;

  constructor(parameters: msdyn_getCTandEACdisabledEntitiesRequestParameters) {
    super("msdyn_getCTandEACdisabledEntities", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getCTandEACdisabledEntities`;

    const body = requestBody({
      msdyn_entityList: this.Parameters.msdyn_entityList,
      msdyn_entityName: this.Parameters.msdyn_entityName,
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

  async parseResponse(response: Response): Promise<msdyn_getCTandEACdisabledEntitiesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_getCTandEACdisabledEntitiesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_getCTandEACdisabledEntities action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_getCTandEACdisabledEntitiesResult {
  "@odata.context"?: string;
  msdyn_apiResponse: string;
}

/**
 * msdyn_getCTandEACdisabledEntities response message
 *
 * `result` is the value the msdyn_getCTandEACdisabledEntities action returns (see {@link msdyn_getCTandEACdisabledEntitiesResult}).
 */
export class msdyn_getCTandEACdisabledEntitiesResponse extends OrganizationResponse {
  constructor(public result: msdyn_getCTandEACdisabledEntitiesResult) {
    super("msdyn_getCTandEACdisabledEntities");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_getCTandEACdisabledEntitiesResponse {
    return new msdyn_getCTandEACdisabledEntitiesResponse(
      data as msdyn_getCTandEACdisabledEntitiesResult
    );
  }
}
