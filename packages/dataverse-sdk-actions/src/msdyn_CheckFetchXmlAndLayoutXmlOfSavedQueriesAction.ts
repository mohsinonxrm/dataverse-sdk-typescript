import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnSeverity: number;
  ReturnStatus: number;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse;
  }
}
