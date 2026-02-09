import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ListCredentialDependencies function
 */
export interface ListCredentialDependenciesResponse {
  response: string;
}

/**
 * ListCredentialDependencies function
 *
 * Bound function
 * Binding parameter: entity (mscrm.credential)
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
    const data = await response.json();
    return data as ListCredentialDependenciesResponse;
  }
}
