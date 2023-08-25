import { copyToClipboard, getPathString, handlePlayEvent, handleShare, postForm, youTubeEmbedLink } from "~/lib";
import { Constants, map } from "~/types";
import type { iDynamic, iEvent, iApiOptions, iSubmit, iModal } from "~/types";
import intlTelInput from "intl-tel-input"

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
  private searchInp: HTMLInputElement
  private headerEl: HTMLElement
  private sublineEl: HTMLElement
  private resetSearchBtn: HTMLElement
  private countryCode: string = "+234"
  private countryName: string = ""
  private formMap: Map<string, iSubmit> = new Map()

  constructor() {
    this.bodyEl = document.querySelector(Constants.BODYELEMENT) as HTMLElement
    this.modalEl = document.getElementById(Constants.MODALELEMENTID) as HTMLElement
    this.searchInp = document.getElementById(Constants.SEARCHINPUTID) as HTMLInputElement
    this.resetSearchBtn = document.getElementById(Constants.RESETSEARCHID) as HTMLElement
    this.headerEl = document.getElementById(Constants.HEADERID) as HTMLElement
    this.sublineEl = document.getElementById(Constants.SUBLINEID) as HTMLElement

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
    this.initializeTelInput()
    this.initSearch()
  }

  initializeTelInput() {
    const telInput = document.querySelector('input[type="tel"]') as HTMLInputElement
    if (telInput) {
      const phoneInput = intlTelInput(telInput as Element, {
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js',
        preferredCountries: ['ng'],
        separateDialCode: true, // Show separate dial code
      });

      // phoneInput.setNumber(this.countryCode + telInput.value); // Set initial value
      // telInput.value = this.countryCode;
      this.countryName = phoneInput.getSelectedCountryData().name

        // Watch for changes to selected country
        ; (telInput as HTMLInputElement).addEventListener('countrychange', (e) => {
          this.countryCode = `${phoneInput.getSelectedCountryData().dialCode}`
          this.countryName = phoneInput.getSelectedCountryData().name
        });
    }
  }

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
      case Constants.SHARE: return this.shareSermon(target)
    }

    switch (type) {
      case Constants.WITHSUBMENU: return this.openSubmenu(evt)
    }
  }

  shareSermon(target: HTMLElement) {
    const event = JSON.parse(target.getAttribute(Constants.DATAEVENT) as string) as iEvent
    handleShare(event.title, event.videourl || event.audiourl)
    gtag(Constants.EVENT, Constants.SHARESERMON, {
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
        this.headerEl.innerHTML = (map.get(pathstring.main)?.header as string).replaceAll("%20", " ")
        this.sublineEl.innerHTML = (map.get(pathstring.main)?.subline as string).replaceAll("%20", " ")
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

    console.log("name is", name)
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


  submitDetails(form: HTMLFormElement, id: string) {

    const entries = this.formEntries(form) as any;

    entries.countryName = this.countryName
    entries.countryCode = this.countryCode

    gtag(Constants.EVENT, Constants.PARTNERFORMSUBMISSION, {
      ...entries,
      'screen_name': id
    });

    const map = this.formMap.get(id) as iSubmit

    const apiOptions: iApiOptions = {
      collection: Constants.RCNLAGOSCOLLECTION,
      id,
      entries,
      wrapperHTML: form,
      statusHTML: form.querySelector(Constants.STATUSQUERY) as HTMLElement
    }

    postForm(apiOptions, map.messages, map.api)
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

const main = new Main()
const slider = new Slider()
const audioController = new AudioController()

if (pathstring.main === Constants.HOME) {
  slider.init()
}

if (pathstring.main === Constants.SERMONS) {
  audioController.init()
}