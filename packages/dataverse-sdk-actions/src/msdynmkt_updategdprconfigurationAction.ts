import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_updategdprconfiguration action
 */
export interface msdynmkt_updategdprconfigurationResponse {
  msdynmkt_updategdprconfigurationresponse: string;
}

/**
 * msdynmkt_updategdprconfiguration action
 *
 * Unbound action
 */
export class msdynmkt_updategdprconfigurationAction implements Executable<msdynmkt_updategdprconfigurationResponse> {
  constructor(
    public readonly msdynmkt_updategdprconfigurationisenforced: boolean,
    public readonly msdynmkt_updategdprconfigurationischangeloggingenabled: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_updategdprconfiguration`;

    const body: Record<string, unknown> = {
      msdynmkt_updategdprconfigurationisenforced: this.msdynmkt_updategdprconfigurationisenforced,
      msdynmkt_updategdprconfigurationischangeloggingenabled:
        this.msdynmkt_updategdprconfigurationischangeloggingenabled,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdynmkt_updategdprconfigurationResponse> {
    const data = await response.json();
    return data as msdynmkt_updategdprconfigurationResponse;
  }
}
