import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the ListCredentialDependencies function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ListCredentialDependenciesResponse {
  "@odata.context"?: string;
  response: string;
}

/**
 * ListCredentialDependencies function
 *
 * Bound function
 * Binding parameter: entity (mscrm.credential)
 *
 * The first argument is the id of the credential record to call it on.
 */
export class ListCredentialDependenciesFunction implements Executable<ListCredentialDependenciesResponse> {
  constructor(public readonly credentialId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/credentials(${this.credentialId})/Microsoft.Dynamics.CRM.ListCredentialDependencies`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<ListCredentialDependenciesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ListCredentialDependenciesResponse;
  }
}
