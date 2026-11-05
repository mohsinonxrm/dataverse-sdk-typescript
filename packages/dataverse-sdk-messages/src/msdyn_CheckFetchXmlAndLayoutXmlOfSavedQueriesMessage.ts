import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries request message
 *
 * Web API Action: msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries
 */
export class msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse>
{
  constructor(public idFetchAndLayoutXmlList: string) {
    super("msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries`;

    const body: Record<string, unknown> = {
      IdFetchAndLayoutXmlList: this.idFetchAndLayoutXmlList,
    };

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
    const data = await response.json();
    return msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      IdFetchAndLayoutXmlList: this.idFetchAndLayoutXmlList,
    };
  }
}

/**
 * msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries response message
 */
export class msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse) {
    super("msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries");
  }

  static fromResponse(data: unknown): msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse {
    return new msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse((data as any).value);
  }
}
