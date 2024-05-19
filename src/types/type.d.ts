export type languageDataType = {
  id: string;
  lang: string;
  url: string;
  color: string;
  logo: string;
  lgn_id: number;
  lgn_code: string;
  sectors?: {
    hoverText: string;
    icon: string;
    label: string;
    url: string;
    value: string;
  }[];
};
