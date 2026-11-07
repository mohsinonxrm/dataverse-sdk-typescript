import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { MissingComponent } from "./types/index.js";

/**
 * Response from the RetrieveMissingComponents function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveMissingComponentsResponse {
  "@odata.context"?: string;
  MissingComponents: MissingComponent[];
}

/**
 * Parameters of the RetrieveMissingComponents function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveMissingComponentsFunctionParameters {
  CustomizationFile: string;
}

/**
 * RetrieveMissingComponents function
 *
 * Unbound function
 */
export class RetrieveMissingComponentsFunction implements Executable<RetrieveMissingComponentsResponse> {
  constructor(public readonly parameters: RetrieveMissingComponentsFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMissingComponents`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.CustomizationFile !== undefined) {
      aliases.push(`CustomizationFile=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.CustomizationFile, "Edm.Binary"));
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

  async parseResponse(response: Response): Promise<RetrieveMissingComponentsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveMissingComponentsResponse;
  }
}
