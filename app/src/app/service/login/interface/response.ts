export interface Response {
    roles: { rol: string }[];
    metadata: {
      fieldCount: number;
      affectedRows: number;
      insertId: number;
      info: string;
      serverStatus: number;
      warningStatus: number;
      changedRows: number;
    };
}