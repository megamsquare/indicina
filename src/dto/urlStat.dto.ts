export interface NewDecoder {
    short_url: string;
    ip_address: string;
  }
  
  export interface Visit {
    ip_address: string;
    visit_count: number;
    create_date: Date;
    update_date: Date;
  }