/**
 * GetHostedRpaCapacityResponse complex type
 */
export interface GetHostedRpaCapacityResponse {
  failedToGetCapacity?: boolean;
  isPayGo?: boolean;
  hostedMachineGroupsBotCount?: number;
  hostedMachineCount?: number;
  hostedGroupCount?: number;
  totalEnvironmentAddOns?: number;
  availableCapacity?: number;
}
