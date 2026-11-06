import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries response message
 *
 * `result` is the value the msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries action returns (see {@link msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResult}).
 */
export class msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResult) {
    super("msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse {
    return new msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse(
      data as msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResult
    );
  }
}
