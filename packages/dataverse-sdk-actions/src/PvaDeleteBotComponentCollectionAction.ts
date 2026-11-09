import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the PvaDeleteBotComponentCollection action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type PvaDeleteBotComponentCollectionResponse = void;

/**
 * PvaDeleteBotComponentCollection action
 *
 * Bound action
 * Binding parameter: entity (mscrm.botcomponentcollection)
 *
 * The first argument is the id of the botcomponentcollection record to call it on.
 */
export class PvaDeleteBotComponentCollectionAction implements Executable<PvaDeleteBotComponentCollectionResponse> {
  constructor(public readonly botcomponentcollectionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/botcomponentcollections(${odataLiteral.guid(this.botcomponentcollectionId)})/Microsoft.Dynamics.CRM.PvaDeleteBotComponentCollection`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<PvaDeleteBotComponentCollectionResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
