import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveEnvironmentVariableValue function
 */
export interface RetrieveEnvironmentVariableValueResponse {
  Value: string;
}

/**
 * RetrieveEnvironmentVariableValue function
 *
 * Unbound function
 */
export class RetrieveEnvironmentVariableValueFunction implements Executable<RetrieveEnvironmentVariableValueResponse> {
  constructor(public readonly definitionSchemaName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveEnvironmentVariableValue`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.definitionSchemaName !== undefined) {
      aliases.push(`DefinitionSchemaName=@p1`);
      params.append(
        "@p1",
        typeof this.definitionSchemaName === "string"
          ? `'${this.definitionSchemaName}'`
          : String(this.definitionSchemaName)
      );
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveEnvironmentVariableValueResponse> {
    const data = await response.json();
    return data as RetrieveEnvironmentVariableValueResponse;
  }
}
