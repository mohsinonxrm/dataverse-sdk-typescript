import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse as msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesRequestParameters {
  IdFetchAndLayoutXmlList: string;
}

/**
 * msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries request message
 *
 * Web API Action: msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries
 */
export class msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesRequestParameters>;

  constructor(parameters: msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesRequestParameters) {
    super("msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries`;

    const body = requestBody({
      IdFetchAndLayoutXmlList: this.Parameters.IdFetchAndLayoutXmlList,
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
  ): Promise<msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries response message
 */
export class msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponseData) {
    super("msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries");
  }

  static fromResponse(data: unknown): msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse {
    return new msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse(
      responseObject<msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponseData>(data)
    );
  }
}
