export type SmallCountry = Pick<Country, 'name' | 'cca3' | 'borders'>;

export interface Country {
  name: Name;
  cca3: string;
  status: string;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Languages;
  translations: Record<string, Translation>;
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  flag: string;
  maps: Maps;
  population: number;
  fifa: string;
  timezones: string[];
  continents: string[];
  flags: Flags;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Languages {
  nno: string;
  nob: string;
  smi: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface NativeName {
  nno: Translation;
  nob: Translation;
  smi: Translation;
}

export interface Translation {
  official: string;
  common: string;
}

export interface PostalCode {
  format: string;
  regex: string;
}
