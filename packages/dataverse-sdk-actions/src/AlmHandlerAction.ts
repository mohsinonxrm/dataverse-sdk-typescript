import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AlmHandler action
 */
export interface AlmHandlerResponse {
  result: string;
}

/**
 * AlmHandler action
 *
 * Unbound action
 */
export class AlmHandlerAction implements Executable<AlmHandlerResponse> {
  constructor(
    public readonly action: string,
    public readonly input?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AlmHandler`;

    const body: Record<string, unknown> = {
      action: this.action,
      input: this.input,
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

  async parseResponse(response: Response): Promise<AlmHandlerResponse> {
    const data = await response.json();
    return data as AlmHandlerResponse;
  }
}
