export interface iMenu {
  name: string;
  url: string;
}

export interface DateTimeFormatOptions {
  year: "numeric" | "2-digit" | undefined;
  month: "numeric" | "2-digit" | "short" | "long" | "narrow" | undefined;
  day: "numeric" | "2-digit" | undefined;
}


export enum Constants {
  SITENAME = "APBN",
  BUTTON = "button",
  LINK = "link",
  GENERIC = "Generic",
  PROGRAM = "Program",
  TWITTER = "twitter",
  LINKEDIN = "linkedin",
  FACEBOOK = "facebook",
  INSTAGRAM = "instagram",
  YOUTUBE = "youtube",
  TELEGRAM = "telegram",
  WHATSAPP = "whatsapp",
  PRESIDENT = "President",
  SUCCESS = "success",
  ERROR = "error",
  DARK = "dark",
  LIGHT = "light",
  THEME = "theme",
  DARKMODEBTN = "darkModeBtn",
  MOBILENAVBTN = "mobileNavToggleBtn",
  BODYELEMENT = "body",
  MODALELEMENTID="modal",
  OPEN = "open",
  CLICK = "click",
  SUBMIT="submit",
  CLOSEMOBILENAVBTN = ".-close-bt",
  WITHSUBMENU = "withsubmenu",
  DARKMODETOGGLE = "dark-mode-toggle",
  HAMBURGER = "hamburger",
  CLOSEMOBILEMENU = "close-mobile-menu",
  LINKS = ".-links",
  ACTIVE = "active",
  MOBILENAVTOP = "[data-type='mobile navigation'] .-top",
  HIDEBACKBTNCLASS = "-hide-back-bt",
  BACKBTN = "back button",
  HOME = "home",
  CURRENT = "current",
  YEARID="year",
  SLIDECLASS=".slide",
  MODALOVERLAY="modal overlay",
  PLAYVIDEO="play video",
  PLAYAUDIO="play audio",
  COPY="copy",
  VALUEQUERY=".-value",
  ANIMATE="animate",
  DISPLAY="display",
  IFRAME="iframe",
  AUDIO="audio",
  MODALHEADER="modal-header",
  MODALFOOTER="modal-footer",
  STATUSQUERY=".-status",
  EVENT="event",
  SUBSCRIBE="subscribe",
  REGISTRATIONFORMSUBMISSION="registration_form_submission",
  CONTACTFORMSUBMISSION="contact_form_submission",
  SUBSCRIBERS="subscribers",
  PARTNERS="partners",
  CONTACTUS="contactus",
  PRAYERREQUESTS="prayerrequests",
  TESTIMONIES="testimonies",
  REGISTRATION="registration",
  RCNLAGOSCOLLECTION="rcnlagos",
  SUBSCRIBEAPI="/api/subscribe",
  PARTNERAPI="/api/partner",
  CONTACTUSAPI="/api/contactus",
  PRAYERREQUESTSAPI="/api/prayerrequest",
  TESTIMONIESAPI="/api/testimony",
  REGISTRATIONAPI="/api/registration",
  INPUT="input",
  TEXTAREA="textarea",
  SELECT="select",

  ACCOUNTDETAILS="Account Details",
  GETINTOUCH="Get in Touch",
  TOOLTIPID="#tooltip",
  COPIED="copied",
  RESETSEARCHID="resetSearch",

  // forms
  SUBSCRIBEFORM="subscribe form",
  CONTACTUSFORM="contact form",
  PRAYERREQUESTFORM="request form",
  TESTIMONYFORM="testimony form",
  REGISTRATIONFORM="registration form",
  PARTNERSFORM="partners form",

  // select field names
  JOININGFROM="joiningFrom",
  NEEDACCOMMODATION="needAccommodation",
  FIRSTTIMER="firstTimer", 
  PROGRAMFIELD="program",
  TRANSPORT="transport",
  PROGRAMDATE="programdate",
  
  SEARCHINPUTID="search-input",
  SEARCH="search",
  DOWNLOAD="download",
  SHARE="share",

  // events
  PLAYEVENT="play",
  SEARCHFORSERMON="search_for_sermon",
  SHARESERMON="share_sermon",
  COPYDATA="copy_information",

  // attributes 
  DATATITLE="data-title",
  DATANAME = "data-name",
  DATATYPE = "data-type",
  DATASERMON="data-sermon",
  DATAEVENT="data-event",

  SERMONS="sermons",
  RESETSEARCH="reset search",

  HIDDEN="hidden",
  PROGRAMCATEGORY="program category",
  DATACATEGORYNAME="data-category-name",

  HEADERID="header",
  SUBLINEID="subline",
  DEFAULTSERMONHEADER="encounter the word",
  DEFAULTSUBLINEHEADER="Explore our programs and get notified of upcoming programs.",
  PAGESIZE="10",

  APBN="APBN",
  ADVERTISING="Advertising",

  // clock
  DAYS="days",
  HOURS="hours",
  MINUTES="minutes",
  SECONDS="seconds",
  DATASLIDERDATE="data-slider-date",
  DECREEUPLOAD="decreeUpload",
  DOCUMENTORRECEIPT1="documentOrReceipt1",
  DOCUMENTORRECEIPT2="documentOrReceipt2",
  DOCUMENTORRECEIPT3="documentOrReceipt3",
  RELEVANTINFOFILE="relevantInfoFile",
  SPONSOR1SIGNATURE="sponsor1Signature",
  SPONSOR2SIGNATURE="sponsor2Signature"
}

// interface iHeroHeader {
//   header: string;
//   subline: string;
// }

export interface iSlider {
  active: boolean;
  date?: Date;
  name: string; 
  venue?: string;
  map?: string;
  theme?: string;
  host?: string;
  chairman?: string;
  keynotespeaker?: string;
  videourl?: string;
  image: string;
  type: string;
  website?: string;
  body?: string;
}

export interface iTime {
  t: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface iPage<T = any> {
  /** result */
  data: T[];
  /** metadata */
  /** the count of the first item on the page, starting from 0 */
  start: number;
  /** the count of the last item on the page, starting from 0 */
  end: number;
  /** total number of results */
  total: number;
  /** the current page number, starting from 1 */
  currentPage: number;
  /** number of items per page (default: 25) */
  size: number;
  /** number of last page */
  lastPage: number;
  url: {
    /** url of the current page */
    current: string;
    /** url of the previous page (if there is one) */
    prev: string | undefined;
    /** url of the next page (if there is one) */
    next: string | undefined;
  };
}

// export const maps = {
//   sermon: {
//     header: "Encounter the Word",
//     subline: "Explore our programs and get notified of upcoming programs."
//   },
//   blog: {
//     header: "Blog",
//     subline: "A community board seasoned to rejuvinate your heart"
//   }
// }

// const map = new Map<string, iHeroHeader>()
// map.set("sermons", {
//   header: "Encounter the Word",
//   subline: "Explore our programs and get notified of upcoming programs."
// })

// map.set("blog", {
//   header: "Blog",
//   subline: "A community board seasoned to rejuvinate your heart"
// })

// export {
//   map
// }

export const inputClassList = [
  "block",
  "rounded-lg",
  "border-2",
  "border-darkest",
  "dark:border-gray-600",
  "border-opacity-30",
  "py-1.5",
  "shadow-sm",
  "placeholder:text-gray-400",
  "w-full",
  "px-2",
  "shadow-rcn",
  "bg-transparent",
  "focus-visible:border-darkest",
  "dark:focus-visible:border-white",
  "focus-visible:outline-none"
];

export interface iCommon {
  title: string;
  description: string;
  image: string;
  date: string;
  tags?: string[]
  videourl?: string;
}

export interface iPost extends iCommon {
  url: string;
  filename: string;
}

export interface iPostPage extends iCommon {
  tags: string[];
  content: string;
}

export interface iBlog {
  active: boolean,
  title: string,
  description: string,
  image: string,
  date: Date,
  tags?: string[],
  videourl?: string,
  slug?: string
}

export interface iTeam {
  order: string,
  name: string,
  acronym?: string,
  role: string,
  date: Date,
  picture: string,
  body?: string
}

export interface iSector {
  name: string;
  img: string;
}

export interface iMember {
  acronym: string;
  fullname: string;
  category: string;
  website: string;
  logo: string
}

// export interface iEntry {
//   id: string;
//   slug: string;
//   body: string;
//   collection: string;
//   data: iBlog;
//   render?: Function
// }

export interface iPrayercell {
  name: string;
  type: string;
  coordinator: string;
  phonenumber: string;
  meetingtime: string;
  address: string;
  image: string;
  url: string;
}

export interface iDepartmentCommon {
  image: string;
}

export interface iDepartment extends iDepartmentCommon {
  url: string;
  filename: string;
  description: string;
  title: string;
}

export interface iDepartmentPage extends iDepartmentCommon {
  name: string;
  body: string;
}

interface iURL {
  url: string;
}

export interface iSlug extends iURL {
  filename: string;
}

export interface iMenu extends iURL {
  name: string;
  arialabel: string;
}

export interface iPastor {
  order: number;
  title: string;
  name: string;
  role: string;
  image: string;
  content: string;
  url?: string;
}

export interface iProgramCategory {
  name: string;
  time: string;
  image: string;
  description: string;
}

export interface iEvent {
  date: Date;
  title: string;
  description: string;
  image: string;
  videourl: string;
  audiourl: string;
  metadata: string;
  body: string;
}

export interface iQuery {
  col?: string;
  id?: string;
}

export interface iResponse {
  error?: boolean;
  message?: string;
  success?: boolean
}

export interface iApiOptions {
  collection?: string;
  id?: string;
  entries?: any;
  wrapperHTML?: HTMLElement;
  statusHTML?: HTMLElement,
}

export interface iMessage {
  errorMessage?: string;
  successMessage?: string;
}

export interface iDynamic {[key: string] : any}

export interface iSubscribe {
  date: string;
  email: string;
}

export interface iPartner {
  date: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  countryName: string;
  countryCode: string;
}


export interface iContact {
  date: string;
  email: string;
  name: string;
  phoneNumber: string;
  subject: string;
  inquiry: string;
  countryName: string;
  countryCode: string;
}

export interface iParams extends iQuery, iMessage {}

export interface iOptions {
  data: any;
  params: {
    id: string;
    col: string;
    errorMessage: string;
    successMessage: string;
  }
}

export interface f {
  name: string; 
  field: string;
  type: string;
  placeholder: string;
}

export interface iSubmit {
  id: string;
  messages: iMessage,
  api: string
}

export interface iSubmitMap {
  partners: iSubmit;
  contactus: iSubmit;
  subscribers: iSubmit
}

interface iKeyVal {
  key: string;
  val: string;
}

export interface iAccount {
  title: string;
  keyvals: iKeyVal[];
  order: number;
}

export interface iModal {
  event: iEvent,
  iframe: HTMLIFrameElement,
  audio: HTMLAudioElement
}

export interface iInput {
  name: string;
  type: string;
  placeholder: string;
  field: string
}

export interface iImage {
  quote: string;
}