import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ThisFiscalPeriod function
 */
export interface ThisFiscalPeriodResponse {
  value: boolean;
}

/**
 * ThisFiscalPeriod function
 *
 * Unbound function
 */
export class ThisFiscalPeriodFunction implements Executable<ThisFiscalPeriodResponse> {
  constructor(public readonly propertyName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ThisFiscalPeriod`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.propertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append(
        "@p1",
        typeof this.propertyName === "string" ? `'${this.propertyName}'` : String(this.propertyName)
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

  async parseResponse(response: Response): Promise<ThisFiscalPeriodResponse> {
    const data = await response.json();
    return data as ThisFiscalPeriodResponse;
  }
}
