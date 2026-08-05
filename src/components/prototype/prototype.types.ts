export type BusinessMoment = "active" | "starting" | "";

export type View = "form" | "review" | "submitting" | "success";

export type FormStep = 1 | 2 | 3;

export type RequestData = {
  responsibleName: string;
  whatsapp: string;
  businessMoment: BusinessMoment;
  businessName: string;
  segment: string;
  city: string;
  services: string[];
  socialLinks: string[];
  driveLink: string;
  useSocialPhotos: boolean;
  additionalInfo: string;
  consents: {
    materials: boolean;
    publicResearch: boolean;
    videoOnly: boolean;
    whatsapp: boolean;
  };
};

export type RequestErrors = Record<string, string>;

export type UpdateRequestData = <K extends keyof RequestData>(
  field: K,
  value: RequestData[K],
) => void;

export function createInitialData(): RequestData {
  return {
    responsibleName: "",
    whatsapp: "",
    businessMoment: "",
    businessName: "",
    segment: "",
    city: "",
    services: [],
    socialLinks: [""],
    driveLink: "",
    useSocialPhotos: false,
    additionalInfo: "",
    consents: {
      materials: false,
      publicResearch: false,
      videoOnly: false,
      whatsapp: false,
    },
  };
}
