import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
 * msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueries action
 *
 * Unbound action
 */
export class msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesAction implements Executable<msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse> {
  constructor(public readonly idFetchAndLayoutXmlList: string) {}

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
    return data as msdyn_CheckFetchXmlAndLayoutXmlOfSavedQueriesResponse;
  }
}
