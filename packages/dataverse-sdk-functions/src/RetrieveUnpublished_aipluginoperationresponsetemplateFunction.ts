import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aipluginoperationresponsetemplate } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_aipluginoperationresponsetemplateResponse extends aipluginoperationresponsetemplate {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.aipluginoperationresponsetemplate)
 */
export class RetrieveUnpublished_aipluginoperationresponsetemplateFunction implements Executable<RetrieveUnpublished_aipluginoperationresponsetemplateResponse> {
  constructor(public readonly aipluginoperationresponsetemplateId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/aipluginoperationresponsetemplates(${this.aipluginoperationresponsetemplateId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<RetrieveUnpublished_aipluginoperationresponsetemplateResponse> {
    const data = await response.json();
    return data as RetrieveUnpublished_aipluginoperationresponsetemplateResponse;
  }
}
