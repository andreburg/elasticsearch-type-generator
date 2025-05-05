export type Log = {
  app_name: string;
  change_date: Date;
  changed_by: string;
  csb_control: string;
  ehod: string;
  expiry_status: string;
  host_name_failed_cmdb_lookup: string;
  hostname: string;
  hostnames: string;
  me: string;
  pd_date_completed: Date;
  process: string;
  processes: string;
  sra: {
    date: {
      approved: Date;
      logged: Date;
    };
    process: string;
  };
  status: string;
  updated_pd_process: string;
};
