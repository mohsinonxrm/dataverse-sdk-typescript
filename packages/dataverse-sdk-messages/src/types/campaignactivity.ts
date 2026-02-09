/**
 * campaignactivity entity type
 */
export interface campaignactivity {
  importsequencenumber: number;
  actualcost_base: number;
  budgetedcost: number;
  excludeifcontactedinxdays: number;
  donotsendonoptout: boolean;
  ignoreinactivelistmembers: boolean;
  budgetedcost_base: number;
  actualcost: number;
  category: string;
  subcategory: string;
  channeltypecode: number;
  typecode: number;
  overriddencreatedon: string;
}
