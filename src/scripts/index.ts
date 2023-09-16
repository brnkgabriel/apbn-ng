import { copyToClipboard, getPathString, handlePlayEvent, handleShare, postForm, youTubeEmbedLink } from "~/lib";
import { Constants } from "~/types";
import type { iDynamic, iEvent, iApiOptions, iSubmit, iModal, iTime, iOptions, iEntry, iRegisterURLs, iRegisterFiles, iFilesUrls, iSubmitOptions } from "~/types";
import { deleteFile, listFiles, uploadBlobOrFile } from "~/pages/api/storage";
import type { StorageReference } from "firebase/storage";

export const el = (query: string, parent?: HTMLElement) => parent ? parent.querySelector(query) : document.querySelector(query)
export const all = (query: string, parent?: HTMLElement) => parent ? parent.querySelectorAll(query) : document.querySelectorAll(query)

const url = new URL(location.href)
const pathstring = getPathString(url.pathname);

(function () {

  // activate current link
  let links: NodeListOf<Element>
  if (pathstring.main === Constants.HOME) {
    links = document.querySelectorAll(`a[aria-label=${Constants.HOME}]`)
  } else {
    links = document.querySelectorAll(`a[aria-label=${pathstring.main}]`)
  }
  links.forEach(link => link.classList.add(Constants.ACTIVE))
})();

class Main {
  private bodyEl: HTMLElement
  private modalEl: HTMLElement
  private preloader: HTMLElement
  private searchInp: HTMLInputElement
  private headerEl: HTMLElement
  private sublineEl: HTMLElement
  private resetSearchBtn: HTMLElement
  // private countryCode: string = "+234"
  // private countryName: string = ""
  private formMap: Map<string, iSubmit> = new Map()
  private totalFiles: number = 0

  constructor() {
    this.bodyEl = document.querySelector(Constants.BODYELEMENT) as HTMLElement
    this.modalEl = document.getElementById(Constants.MODALELEMENTID) as HTMLElement
    this.searchInp = document.getElementById(Constants.SEARCHINPUTID) as HTMLInputElement
    this.resetSearchBtn = document.getElementById(Constants.RESETSEARCHID) as HTMLElement
    this.headerEl = document.getElementById(Constants.HEADERID) as HTMLElement
    this.sublineEl = document.getElementById(Constants.SUBLINEID) as HTMLElement
    this.preloader = document.querySelector(Constants.PRELOADER) as HTMLElement

    this.formMap.set(Constants.SUBSCRIBERS, {
      id: Constants.SUBSCRIBERS,
      messages: {
        errorMessage: "You've already subscribed",
        successMessage: "Successfully subscribed"
      },
      api: Constants.SUBSCRIBEAPI
    })

    this.formMap.set(Constants.CONTACTUS, {
      id: Constants.CONTACTUS,
      messages: {
        errorMessage: "Error submitting request",
        successMessage: "Successfully submitted. We will contact you shortly"
      },
      api: Constants.CONTACTUSAPI
    })

    this.formMap.set(Constants.PARTNERS, {
      id: Constants.PARTNERS,
      messages: {
        errorMessage: "You are already a partner",
        successMessage: "Successfully submitted"
      },
      api: Constants.PARTNERAPI
    })

    this.formMap.set(Constants.PRAYERREQUESTS, {
      id: Constants.PRAYERREQUESTS,
      messages: {
        errorMessage: "Error submitting request",
        successMessage: "Thank you for sharing your request with us. We join our faith to pray with you, and are assured you will share you testimony."
      },
      api: Constants.PRAYERREQUESTSAPI
    })

    this.formMap.set(Constants.REGISTRATION, {
      id: Constants.REGISTRATION,
      messages: {
        errorMessage: "Error submitting request",
        successMessage: "Submission successful! You will be contacted using the information you provided. You are welcome!"
      },
      api: Constants.REGISTRATIONAPI
    })

    this.formMap.set(Constants.TESTIMONIES, {
      id: Constants.TESTIMONIES,
      messages: {
        errorMessage: "Error submitting request",
        successMessage: "Thank you for sharing your testimony with us. "
      },
      api: Constants.TESTIMONIESAPI
    })

    this.init()
  }

  init() {
    addEventListener(Constants.CLICK, this.handleClick.bind(this))
    addEventListener(Constants.SUBMIT, this.handleSubmit.bind(this))
    this.updateCopyrightYear()
    // this.initializeTelInput()
    this.initSearch()
  }

  // initializeTelInput() {
  //   const telInput = document.querySelector('input[type="tel"]') as HTMLInputElement
  //   if (telInput) {
  //     const phoneInput = intlTelInput(telInput as Element, {
  //       utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js',
  //       preferredCountries: ['ng'],
  //       separateDialCode: true, // Show separate dial code
  //     });

  //     // phoneInput.setNumber(this.countryCode + telInput.value); // Set initial value
  //     // telInput.value = this.countryCode;
  //     this.countryName = phoneInput.getSelectedCountryData().name

  //       // Watch for changes to selected country
  //       ; (telInput as HTMLInputElement).addEventListener('countrychange', (e) => {
  //         this.countryCode = `${phoneInput.getSelectedCountryData().dialCode}`
  //         this.countryName = phoneInput.getSelectedCountryData().name
  //       });
  //   }
  // }

  updateCopyrightYear() {
    const year = document.getElementById('year') as HTMLElement
    year.textContent = `${new Date().getFullYear()}`
  }

  handleClick(evt: Event) {
    const target = evt.target as HTMLElement
    const name = target.getAttribute(Constants.DATANAME)
    const type = target.getAttribute(Constants.DATATYPE)

    switch (name) {
      case Constants.DARKMODETOGGLE: return this.toggleDarkMode()
      case Constants.HAMBURGER: return this.toggleMobileNav()
      case Constants.CLOSEMOBILEMENU: return this.toggleMobileNav()
      case Constants.BACKBTN: return this.openMenu(Constants.HOME)
      case Constants.MODALOVERLAY: return this.toggleModal()
      case Constants.PLAYVIDEO: return this.toggleModal(target)
      case Constants.PLAYAUDIO: return this.toggleModal(target)
      case Constants.COPY: return this.handleCopy(target)
      case Constants.SEARCH: return this.handleSearch(this.searchInp.value.toLowerCase())
      case Constants.RESETSEARCH: return this.resetSearch()
      case Constants.SHARE: return this.shareMedia(target)
    }

    switch (type) {
      case Constants.WITHSUBMENU: return this.openSubmenu(evt)
    }
  }

  shareMedia(target: HTMLElement) {
    const event = JSON.parse(target.getAttribute(Constants.DATAEVENT) as string) as iEvent
    handleShare(event.title, event.videourl || event.audiourl)
    gtag(Constants.EVENT, Constants.SHAREMEDIA, {
      'title': event.title,
      'screen_name': pathstring,
      'description': event.description,
      'date': event.date
    });
  }

  getParams() {
    const url = new URL(location.href)
    return {
      url,
      obj: Object.fromEntries(url.searchParams.entries())
    }
  }

  initSearch() {
    const params = this.getParams()
    const searchItem = params.obj["search"]

    if (this.resetSearchBtn) {
      const fxn = this.resetSearchBtn.classList
      searchItem ? fxn.remove(Constants.HIDDEN) : fxn.add(Constants.HIDDEN)

      if (searchItem) {
        this.headerEl.textContent = searchItem.replaceAll("%20", " ")
      } else {
        // const mainStr = (map.get(pathstring.main)?.header as string)
        // const sublStr = (map.get(pathstring.main)?.subline as string)
        // console.log("mainStr", mainStr, "subStr", sublStr)
        // this.headerEl.innerHTML = mainStr.replaceAll("%20", " ")
        // this.sublineEl.innerHTML = sublStr.replaceAll("%20", " ")
      }
    }
  }

  handleSearch(searchTerm: string) {
    localStorage.setItem(Constants.SEARCH, searchTerm)
    const params = this.getParams()
    const page = params.obj["page"]


    params.url.searchParams.set("search", searchTerm)

    if (page) {
      params.url.searchParams.set("page", "1")
    }

    location.href = params.url.href

    const event = pathstring.main === Constants.HOME ? "sermons" : pathstring.main

    gtag(Constants.EVENT, `search_for_${event}`, {
      'search_term': searchTerm,
      'screen_name': pathstring.main
    });
  }

  resetSearch() {
    location.href = `/${pathstring.main}`
    localStorage.removeItem(Constants.SEARCH)
  }

  handleCopy(target: HTMLElement) {
    const button = target.parentElement
    const btnParent = button?.parentElement as HTMLElement
    const toCopy = btnParent.querySelector(Constants.VALUEQUERY)?.textContent as string
    btnParent.classList.add(Constants.COPIED)
    copyToClipboard(btnParent, toCopy)
    gtag(Constants.EVENT, Constants.COPYDATA, {
      'copied_information': toCopy,
      'screen_name': pathstring.main,
    });
  }

  handleSubmit(evt: Event) {
    evt.preventDefault()
    const target = evt.target as HTMLFormElement
    const name = target.getAttribute(Constants.DATANAME)

    switch (name) {
      case Constants.SUBSCRIBEFORM: return this.submitDetails(target, Constants.SUBSCRIBERS)
      case Constants.PARTNERSFORM: return this.submitDetails(target, Constants.PARTNERS)
      case Constants.CONTACTUSFORM: return this.submitDetails(target, Constants.CONTACTUS)
      case Constants.PRAYERREQUESTFORM: return this.submitDetails(target, Constants.PRAYERREQUESTS)
      case Constants.TESTIMONYFORM: return this.submitDetails(target, Constants.TESTIMONIES)
      case Constants.REGISTRATIONFORM: return this.submitDetails(target, Constants.REGISTRATION)
    }
  }

  formEntries(form: HTMLFormElement) {
    const formData = new FormData(form)
    const entries: iDynamic = {
      date: new Date().toLocaleString()
    }

    formData.forEach((value, key) => entries[key] = value)
    return entries
  }

  async handleDelete(file: StorageReference) {
    try {
      await deleteFile(file.fullPath)
      console.log("file", file.name, "= deleted")
    } catch (error: any) {
      console.log("couldn't delete because", error.message)
    }
  }

  getFilesAndURLs(entries: iEntry): { urls: iRegisterURLs, files: iRegisterFiles } {

    const email = entries.email
    const decreeUploadFile = entries[Constants.DECREEUPLOAD] as File
    const documentOrReceipt1File = entries[Constants.DOCUMENTORRECEIPT1] as File
    const documentOrReceipt2File = entries[Constants.DOCUMENTORRECEIPT2] as File
    const documentOrReceipt3File = entries[Constants.DOCUMENTORRECEIPT3] as File
    const relevantInfoFile = entries[Constants.RELEVANTINFOFILE] as File
    const sponsor1SignatureFile = entries[Constants.SPONSOR1SIGNATURE] as File
    const sponsor2SignatureFile = entries[Constants.SPONSOR2SIGNATURE] as File

    return {
      urls: {
        decreeUploadUrl: `${email}/${decreeUploadFile.name}`,
        documentOrReceipt1Url: `${email}/${documentOrReceipt1File.name}`,
        documentOrReceipt2Url: `${email}/${documentOrReceipt2File.name}`,
        documentOrReceipt3Url: `${email}/${documentOrReceipt3File.name}`,
        relevantInfoUrl: `${email}/${relevantInfoFile.name}`,
        sponsor1SignatureUrl: `${email}/${sponsor1SignatureFile.name}`,
        sponsor2SignatureUrl: `${email}/${sponsor2SignatureFile.name}`
      },
      files: {
        decreeUploadFile: entries[Constants.DECREEUPLOAD] as File,
        documentOrReceipt1File: entries[Constants.DOCUMENTORRECEIPT1] as File,
        documentOrReceipt2File: entries[Constants.DOCUMENTORRECEIPT2] as File,
        documentOrReceipt3File: entries[Constants.DOCUMENTORRECEIPT3] as File,
        relevantInfoFile: entries[Constants.RELEVANTINFOFILE] as File,
        sponsor1SignatureFile: entries[Constants.SPONSOR1SIGNATURE] as File,
        sponsor2SignatureFile: entries[Constants.SPONSOR2SIGNATURE] as File
      }
    }
  }

  async uploadAndReplace(entries: iEntry, filesUrls: iFilesUrls) {

    let snpDecreeUpload = ""
    let snpDocumentOrReceipt1 = ""
    let snpDocumentOrReceipt2 = ""
    let snpDocumentOrReceipt3 = ""
    let snpRelevantInfo = ""
    let snpSponsor1Signature = ""
    let snpSponsor2Signature = ""

    if (filesUrls.files.decreeUploadFile.name.length > 0) {
      this.totalFiles++
    }
    if (filesUrls.files.documentOrReceipt1File.name.length > 0){
      this.totalFiles++
    }
    if (filesUrls.files.documentOrReceipt2File.name.length > 0) {
      this.totalFiles++
    }
    if (filesUrls.files.documentOrReceipt3File.name.length > 0) {
      this.totalFiles++
    }
    if (filesUrls.files.relevantInfoFile.name.length > 0) {
      this.totalFiles++
    }
    if (filesUrls.files.sponsor1SignatureFile.name.length > 0) {
      this.totalFiles++
    }
    if (filesUrls.files.sponsor2SignatureFile.name.length > 0) {
      this.totalFiles++
    }

    let count = 0

    if (filesUrls.files.decreeUploadFile.name.length > 0) {
      snpDecreeUpload = await uploadBlobOrFile(filesUrls.urls.decreeUploadUrl, filesUrls.files.decreeUploadFile) as string
      entries.decreeUpload = snpDecreeUpload
      count++
      this.preloader.textContent = `${count} / ${this.totalFiles} files uploaded`
    } else {
      entries.decreeUpload = ""
    }
    if (filesUrls.files.documentOrReceipt1File.name.length > 0) {
      snpDocumentOrReceipt1 = await uploadBlobOrFile(filesUrls.urls.documentOrReceipt1Url, filesUrls.files.documentOrReceipt1File) as string
      entries.documentOrReceipt1 = snpDocumentOrReceipt1
      count++
      this.preloader.textContent = `${count} / ${this.totalFiles} files uploaded`
    } else {
      entries.documentOrReceipt1 = ""
    }
    if (filesUrls.files.documentOrReceipt2File.name.length > 0) {
      snpDocumentOrReceipt2 = await uploadBlobOrFile(filesUrls.urls.documentOrReceipt2Url, filesUrls.files.documentOrReceipt2File) as string
      entries.documentOrReceipt2 = snpDocumentOrReceipt2
      count++
      this.preloader.textContent = `${count} / ${this.totalFiles} files uploaded`
    } else {
      entries.documentOrReceipt2 = ""
    }
    if (filesUrls.files.documentOrReceipt3File.name.length > 0) {
      snpDocumentOrReceipt3 = await uploadBlobOrFile(filesUrls.urls.documentOrReceipt3Url, filesUrls.files.documentOrReceipt3File) as string
      entries.documentOrReceipt3 = snpDocumentOrReceipt3
      count++
      this.preloader.textContent = `${count} / ${this.totalFiles} files uploaded`
    } else {
      entries.documentOrReceipt3 = ""
    }
    if (filesUrls.files.relevantInfoFile.name.length > 0) {
      snpRelevantInfo = await uploadBlobOrFile(filesUrls.urls.relevantInfoUrl, filesUrls.files.relevantInfoFile) as string
      entries.relevantInfoFile = snpRelevantInfo
      count++
      this.preloader.textContent = `${count} / ${this.totalFiles} files uploaded`
    } else {
      entries.relevantInfoFile = ""
    }
    if (filesUrls.files.sponsor1SignatureFile.name.length > 0) {
      snpSponsor1Signature = await uploadBlobOrFile(filesUrls.urls.sponsor1SignatureUrl, filesUrls.files.sponsor1SignatureFile) as string
      entries.sponsor1Signature = snpSponsor1Signature
      count++
      this.preloader.textContent = `${count} / ${this.totalFiles} files uploaded`
    } else {
      entries.sponsor1Signature = ""
    }
    if (filesUrls.files.sponsor2SignatureFile.name.length > 0) {
      snpSponsor2Signature = await uploadBlobOrFile(filesUrls.urls.sponsor2SignatureUrl, filesUrls.files.sponsor2SignatureFile) as string
      entries.sponsor2Signature = snpSponsor2Signature
      count++
      this.preloader.textContent = `${count} / ${this.totalFiles} files uploaded`
    } else {
      entries.sponsor2Signature = ""
    }

    return entries
  }

  async register (options: iSubmitOptions) {
    let { entries, id, form, statusHTML } = options
    const email = entries.email

    const filesUrls = this.getFilesAndURLs(entries)

    try {
      const files = await listFiles(email)
      files.forEach(this.handleDelete.bind(this))
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        await this.handleDelete(file)
      }
      console.log("files = deleted")

      entries = await this.uploadAndReplace(entries, filesUrls)

      console.log("updated entries are", entries)

      gtag(Constants.EVENT, Constants.REGISTRATIONFORMSUBMISSION, {
        ...entries,
        'screen_name': id
      });


      const map = this.formMap.get(id) as iSubmit

      const apiOptions: iApiOptions = {
        collection: Constants.APBN,
        id,
        entries,
        wrapperHTML: form,
        statusHTML
      }

      const res = await postForm(apiOptions, map.messages, map.api)
      this.preloader.textContent = ""
      this.totalFiles = 0
      console.log("submitted is", res)
    } catch (error: any) {

      gtag(Constants.EVENT, Constants.REGISTRATIONFORMSUBMISSION, {
        ...entries,
        'screen_name': id
      });
      console.log("error uploading file", error.message)
    }
  }

  async contact(options: iSubmitOptions) {
    let { entries, id, form, statusHTML } = options

    try {
      
      gtag(Constants.EVENT, Constants.CONTACTFORMSUBMISSION, {
        ...entries,
        'screen_name': id
      });
      
      const map = this.formMap.get(id) as iSubmit

      const apiOptions: iApiOptions = {
        collection: Constants.APBN,
        id,
        entries,
        wrapperHTML: form,
        statusHTML
      }
      const res = await postForm(apiOptions, map.messages, map.api)
      console.log("submitted status is", res)
    } catch (error: any) {

      gtag(Constants.EVENT, Constants.REGISTRATIONFORMSUBMISSION, {
        ...entries,
        'screen_name': id
      });
      console.log("error uploading file", error.message)
    }
  }

  async submitDetails(form: HTMLFormElement, id: string) {

    const statusHTML = form.querySelector(Constants.STATUSQUERY) as HTMLElement
    form.classList.add("-loading")

    let entries = this.formEntries(form) as iEntry;

    const options: iSubmitOptions = {
      entries, form, id, statusHTML
    }

    switch (id) {
      case Constants.REGISTRATION: return await this.register(options)
      case Constants.CONTACTUS: return await this.contact(options)
    
      default:
        break;
    }
  }

  toggleModal(target?: HTMLElement) {
    const name = target?.getAttribute(Constants.DATANAME)
    const iframe = this.modalEl.querySelector(Constants.IFRAME) as HTMLIFrameElement
    const audio = this.modalEl.querySelector(Constants.AUDIO) as HTMLAudioElement
    const event = JSON.parse(target?.getAttribute(Constants.DATAEVENT) as string || "{}") as iEvent
    const header = this.modalEl.querySelector(`h2[data-name="${Constants.MODALHEADER}"]`) as HTMLElement
    const footer = this.modalEl.querySelector(`div[data-name="${Constants.MODALFOOTER}"]`) as HTMLElement

    const props: iModal = { audio, iframe, event }

    if (!this.modalEl.classList.contains(Constants.DISPLAY)) {
      // stopAllAudio()
      this.modalEl.classList.add(Constants.DISPLAY)
      this.modalEl.classList.add(Constants.ANIMATE)
      header.textContent = event.title
      footer.textContent = event.description
      name === Constants.PLAYVIDEO ? this.handleVideo(props) : this.handleAudio(props)
    } else {
      this.modalEl.classList.remove(Constants.ANIMATE)
      this.resetAudioVideo(props)
      setTimeout(() => {
        this.modalEl.classList.remove(Constants.DISPLAY)
      }, 300);
    }
  }

  resetAudioVideo(props: iModal) {
    const { audio, iframe } = props
    const source = audio.querySelector("source")
    iframe?.setAttribute("src", "")
    audio.setAttribute("src", "")
    source?.setAttribute("src", "")
  }

  handleVideo(props: iModal) {
    const { audio, iframe, event } = props
    iframe?.setAttribute("src", youTubeEmbedLink(event.videourl))
    iframe.style.display = "block"
    audio.style.display = "none"
  }

  handleAudio(props: iModal) {
    const { audio, iframe, event } = props
    const source = audio.querySelector("source")
    audio.setAttribute("src", event.audiourl)
    source?.setAttribute("src", event.audiourl)

    iframe.style.display = "none"
    audio.style.display = "block"
  }

  toggleDarkMode() {
    document.documentElement.classList.toggle(Constants.DARK);
    if (document.documentElement.classList.contains(Constants.DARK)) {
      localStorage.setItem(Constants.THEME, Constants.DARK);
    } else {
      localStorage.setItem(Constants.THEME, Constants.LIGHT);
    }
  }

  toggleMobileNav() {
    this.bodyEl.classList.toggle(Constants.OPEN)
  }

  openSubmenu(evt: Event) {
    const target = evt.target as HTMLElement
    const name = target.getAttribute(Constants.DATANAME)

    this.openMenu(name as string)
  }

  openMenu(name: string) {
    this.activateLink(name as string)
    this.toggleBackBtn()
  }

  activateLink(name: string) {
    const links = document.querySelectorAll(Constants.LINKS)
    const link = document.querySelector(`.-links[data-name="${name}"]`)
    links.forEach(link => link.classList.remove(Constants.ACTIVE))
    link?.classList.add(Constants.ACTIVE)
  }

  toggleBackBtn() {
    const mobileNavTop = document.querySelector(Constants.MOBILENAVTOP) as HTMLElement
    mobileNavTop.classList.toggle(Constants.HIDEBACKBTNCLASS)
  }
}

class Slider {
  private num: number = 0
  private interval: any
  constructor() { }

  init() {
    addEventListener("load", this.slide.bind(this));
  }

  slide() {
    const sliders = document.querySelectorAll(Constants.SLIDECLASS)
    this.interval = setInterval(() => {
      this.num = this.num + 1
      if (this.num === sliders.length) {
        this.num = 0
      }
      sliders.forEach(slider => slider.classList.remove("active"))
      sliders[this.num].classList.add("active")
    }, 4000)
  }

  reset() {
    clearInterval(this.interval)
  }
}

class AudioController {
  private audioEls: NodeListOf<HTMLAudioElement>
  constructor() {
    this.audioEls = document.querySelectorAll("audio") as NodeListOf<HTMLAudioElement>
  }

  init() {
    this.audioEls.forEach(audioEl => audioEl.addEventListener(Constants.PLAYEVENT, handlePlayEvent))
  }
}

export class Clock {
  private timeInterval: number = 1
  private daysDigit: HTMLElement
  private hoursDigit: HTMLElement
  private minutesDigit: HTMLElement
  private secondsDigit: HTMLElement
  private timeElement: HTMLElement
  private clockIsVisible: boolean = false
  private countdownStillLive: boolean = false
  constructor() {
    this.daysDigit = el(`span[data-digit="${Constants.DAYS}"]`) as HTMLElement
    this.hoursDigit = el(`span[data-digit="${Constants.HOURS}"]`) as HTMLElement
    this.minutesDigit = el(`span[data-digit="${Constants.MINUTES}"]`) as HTMLElement
    this.secondsDigit = el(`span[data-digit="${Constants.SECONDS}"]`) as HTMLElement
    this.timeElement = el(`p[${Constants.DATASLIDERDATE}]`) as HTMLElement

    this.clockIsVisible = this.daysDigit !== null
      || this.hoursDigit !== null
      || this.minutesDigit !== null
      || this.secondsDigit !== null


    this.start()
  }

  start() {
    if (this.timeElement) {
      const sliderTimestampStr = this.timeElement.getAttribute(Constants.DATASLIDERDATE)
      const timestamp = Number(sliderTimestampStr)
      const sliderDate = new Date(timestamp)
      this.timeElement.textContent = `${sliderDate.toDateString()}, ${sliderDate.toLocaleTimeString()}`
    }
    if (this.clockIsVisible) {
      const dateStr = this.secondsDigit.getAttribute("data-date") as string
      const endTime = +new Date(dateStr)
      const timeDiff = (endTime - Date.now())
      this.countdownStillLive = timeDiff >= 0

      if (this.countdownStillLive) {
        this.initializeClock(endTime)
      }
    }
  }

  initializeClock(endTime: number) {
    clearInterval(this.timeInterval)
    this.timeInterval = setInterval(() => this.tick(endTime), 1000) as unknown as number
  }

  tick(endTime: number) {
    var rtime = this.remainingTime(endTime)
    this.updateClockUi(rtime)
  }

  updateClockUi(rtime: iTime) {

    this.daysDigit.setAttribute("style", `--value:${rtime.days};`)
    this.hoursDigit.setAttribute("style", `--value:${rtime.hours};`)
    this.minutesDigit.setAttribute("style", `--value:${rtime.minutes};`)
    this.secondsDigit.setAttribute("style", `--value:${rtime.seconds};`)
  }

  isCountdownOver(time: iTime) {
    return time.days === 0 && time.hours === 0 &&
      time.minutes === 0 && time.seconds === 0
  }

  remainingTime(endTime: number) {
    const t = +new Date(endTime) - Date.now()

    const seconds = Math.floor((t / 1000) % 60)
    const minutes = Math.floor((t / 1000 / 60) % 60)
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24)
    const days = Math.floor(t / (1000 * 60 * 60 * 24))
    const time: iTime = { t, days, hours, minutes, seconds }

    if (this.isCountdownOver(time))
      setTimeout(() => console.log("countdown = over"), 3000)

    return time
  }
}

const main = new Main()
// const slider = new Slider()
const clock = new Clock()
const audioController = new AudioController()

// if (pathstring.main === Constants.HOME) {
//   slider.init()
// }

if (pathstring.main === Constants.SERMONS) {
  audioController.init()
}