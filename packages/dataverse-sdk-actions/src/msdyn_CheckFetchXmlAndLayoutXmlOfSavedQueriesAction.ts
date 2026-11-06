import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries action
 */
export interface msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
  ReturnSeverity: number;
  HelpLink: string;
}

/**
 * Parameters of the msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesActionParameters {
  IdFetchAndLayoutXmlList: string;
}

/**
 * msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries action
 *
 * Unbound action
 */
export class msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesAction implements Executable<msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse> {
  constructor(
    public readonly parameters: msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries`;

    const body = requestBody({
      IdFetchAndLayoutXmlList: this.parameters.IdFetchAndLayoutXmlList,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse;
    return (await response.json()) as msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse;
  }
}
