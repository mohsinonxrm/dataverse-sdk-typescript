import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveMaskedAttributesForEntity function
 */
export interface RetrieveMaskedAttributesForEntityResponse {
  AttributeLogicalNames: string[];
}

/**
 * RetrieveMaskedAttributesForEntity function
 *
 * Unbound function
 */
export class RetrieveMaskedAttributesForEntityFunction implements Executable<RetrieveMaskedAttributesForEntityResponse> {
  constructor(public readonly entityLogicalName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMaskedAttributesForEntity`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.entityLogicalName !== undefined) {
      aliases.push(`EntityLogicalName=@p1`);
      params.append(
        "@p1",
        typeof this.entityLogicalName === "string"
          ? `'${this.entityLogicalName}'`
          : String(this.entityLogicalName)
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

  async parseResponse(response: Response): Promise<RetrieveMaskedAttributesForEntityResponse> {
    const data = await response.json();
    return data as RetrieveMaskedAttributesForEntityResponse;
  }
}
