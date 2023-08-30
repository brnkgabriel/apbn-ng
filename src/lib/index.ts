import { Constants, iEvent, type DateTimeFormatOptions, type iApiOptions, type iMessage, type iResponse, type iSlug, iBlog, iPage, iMember, iTeam, iTUnit } from "~/types";

export * from "./data"

export const formatDate = (date: Date) => {
  console.log("date:any", date)
  const options: DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString(undefined, options);
  return formattedDate;
};

// export const ftDate = (date: Date) => {
//   return `${formatDate(date)} ${date.toLocaleTimeString()} GMT+0100`
// }


export const ftDate = (time: Date) => {
  var tUnits: iTUnit = timeUnits(time)
  var t = twelveHrFormat(tUnits.hr, tUnits.mn)
  return `${fullDate(time)}`
}

export const timeUnits = (time: Date) => {
  const _date = time
  const day = _date.getDay()
  const month = _date.getMonth()
  const date = _date.getDate()
  const hr = _date.getHours()
  const mn = _date.getMinutes()
  return { day, month, date, hr, mn }
}

export const pad = (time: number) => time.toString().length == 1 ? '0' + time : time

export const twelveHrFormat = (hr: number, mn:number) => {
  if (hr === 12) return pad(hr) + ':' + pad(mn) + 'pm'
  else if (hr > 12) return pad(hr - 12) + ':' + pad(mn) + 'pm'
  else if (hr === 0) return '12:' + pad(mn) + 'am'
  else return pad(hr) + ':' + pad(mn) + 'am'
}


// export const tDate = (time: Date) => {
//   var _time = new Date(time)
//   var time_date = _time.getDate()
//   var now_date = new Date(Date.now()).getDate()
//   var time_diff = now_date - time_date

//   if (time_diff === 0) return capitalize('today')
//   else if (time_diff === 1) return capitalize('yesterday')
//   else if (time_diff === -1) return capitalize('tomorrow')
//   else return fullDate(time)
// }

export const fullDate = (time: Date) => {
  var date = new Date(time)
  var mnth = date.toLocaleDateString("en-US", { month: 'long' })
  var day = date.toLocaleDateString("en-US", { weekday: 'long' })
  return day + ' ' + mnth + ' ' + date.getDate()
}

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1)

export const slug = (file: string): iSlug => {
  const pieces = file.split("/")
  const filename = pieces[pieces.length - 1]
  return {
    filename,
    url: filename.replace(".md", "").toLowerCase()
  }
}
 
export const formatSearch = (term: string) => term.split(",")[0].split(" ").join("+")

export const showMixlr = async () => {

  let show = false

  try {
    const res = await fetch("https://api.mixlr.com/users/7094849/broadcast?source=embed")

    if (res.ok) {
      show = true
    }

  } catch (error: any) {
    console.log("error from mixlr fetch", error.message)
    show = false
  }
  
  return show
}

// export const btClasses = "flex items-center p-2 sm:w-8 sm:h-8 sm:p-0 sm:justify-center text-xs font-medium text-gray-700 bg-white border-2 border-white rounded-lg   dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 relative shadow-rcn dark:shadow-none"

export const btClasses = [
  "flex",
  "items-center",
  "p-2",
  "sm:w-8",
  "sm:h-8",
  "sm:p-0",
  "sm:justify-center",
  "text-xs",
  "font-medium",
  "text-gray-700",
  "bg-white",
  "relative",
  "rounded-lg",
  "dark:bg-darker",
  "focus:outline-none",
  "dark:text-gray-100",
  "dark:border-darker",
  "dark:hover:text-white",
  "shadow-custom",
] 

export const btClassList = [
  "flex",
  "items-center",
  "justify-center",
  "p-2",
  "w-[39.2px]",
  "h-[39.2px]",
  "text-xs",
  "font-medium",
  "text-gray-700",
  "bg-white",
  "border-2",
  "border-white",
  "rounded-lg",
  "dark:bg-gray-800",
  "focus:outline-none",
  "dark:text-gray-400",
  "dark:border-gray-600",
  "dark:hover:text-white",
  "dark:hover-bg-gray-700",
  "relative",
  "shadow-custom",
  "dark:shadow:none"
]
 

export const strToHexColorCode = (str: string) => {
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 3) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour
}

export const youTubeThumbnail = (link: string) => {
  const id = obtainYouTubeID(link)
  return `https://img.youtube.com/vi/${id}/0.jpg`
}

const obtainYouTubeID = (link: string) => {
  const url = new URL(link)
  const search = url.search.split("?v=")
  let searchTarget = ""
  if (search[1] && search[1].length > 0) {
    searchTarget = search[1].split("&t=")[0]
  }
  const pieces = url.pathname.split("/")

  let id = ""
  if (searchTarget && searchTarget.length > 0) id = searchTarget
  if (pieces[2] && pieces[2].length > 0) id = pieces[2]
  return id
}

export const youTubeEmbedLink = (link: string) => {
  if (link.length > 0) {
    const id = obtainYouTubeID(link)
    return `https://www.youtube.com/embed/${id}?rel=0`
  }
  return ""
}


export const youTubeEmbedLinkAutoplay = (link: string) => {
  if (link.length > 0) {
    const id = obtainYouTubeID(link)
    return `https://www.youtube.com/embed/${id}?autoplay=1`
  }
  return ""
}

export const postForm = async (
  apiOptions: iApiOptions,
  messages: iMessage,
  api: string
) => {

  const options = {
    // headers: { "Content-type": "multipart/form-data" },
    headers: { "Content-type": "application/json" },
    method: 'POST',
    body: JSON.stringify({
      data: apiOptions.entries,
      params: {
        col: apiOptions.collection,
        id: apiOptions.id,
        ...messages
      }
    })
  }

  try { 
    const response = await fetch(api, options)
    const remoteData = await response.json()

    handleResponse(remoteData, apiOptions)
    return true
  } catch (error: any) {
    console.error(error)
    apiOptions.wrapperHTML?.classList.remove("-loading")
    return false
  }

}

const handleResponse = (data: iResponse, apiOptions: iApiOptions) => {
  apiOptions.wrapperHTML?.classList.remove("-loading");
  (apiOptions.statusHTML as HTMLElement).textContent = data.message as string;
  (apiOptions.statusHTML as HTMLElement).setAttribute("data-type", data.error ? Constants.ERROR : Constants.SUCCESS)

  apiOptions.wrapperHTML?.classList.add("-show-status")
  setTimeout(() => {
    apiOptions.wrapperHTML?.classList.remove("-show-status");
    (apiOptions.statusHTML as HTMLElement).textContent = "";
  }, 4000);
} 

export const phone = (number: string) => {
  if (!number) return "tel:"
  switch (number[0]) {
    case "0": return "tel:+234" + number.slice(1, number.length)
    case "1": return "tel:+1" + number.slice(1, number.length)
    case "2": return "tel:+234" + number.slice(3, number.length)
    case "+": return number[1] === "2" ? "tel:+234" + number.slice(4, number.length) : "tel:+1" + number.slice(4, number.length)
    default: return "tel:" + number
  }
}

export const whatsappIcon = (number: string) => {

  const num = phone(number)
  number = num.slice(1, num.length)

  return `https://api.whatsapp.com/send?phone=${number}&text=Hello`
}

export const copyToClipboard = (btParent: HTMLElement, textToCopy: string) => {
  return navigator.clipboard.writeText(textToCopy)
    .then(() => copyReaction(btParent, "Copied!"))
    .catch(() => copyReaction(btParent, "Copy Error :("));
}

const copyReaction = (btParent: HTMLElement, msg: string) => {
  const tooltip = btParent.querySelector(Constants.TOOLTIPID) as HTMLElement
  const originalHTML = tooltip.innerHTML
  tooltip.innerHTML = msg
  setTimeout(() => {
    tooltip.innerHTML = originalHTML
    btParent.classList.remove(Constants.COPIED)
  }, 1000);
}

export const handleShare = (title: string, url: string) => {
  navigator.share({ title, text: title, url })
    .then(() => console.log("successful share"))
    .catch((err) => console.log("Error sharing", err))
}

export const eventSearchFilter = (event: iEvent, search: string) => {
  const { date, description, body, title, metadata } = event
  const lowercaseSearch = search.toLowerCase()

  const strDate = formatDate(date).toLowerCase() 
  const matchesDate = strDate.indexOf(lowercaseSearch) !== -1

  const strDescription = description.toLowerCase()
  const matchesDescription = strDescription.indexOf(lowercaseSearch) !== -1

  const strBody = body ? body.toLowerCase() : ""
  const matchesBody = strBody.indexOf(lowercaseSearch) !== -1

  const strTitle = title.toLowerCase() 
  const matchesTitle = strTitle.indexOf(lowercaseSearch) !== -1

  const strMetadata = metadata ? metadata.toLowerCase() : ""
  const matchesMetadata = strMetadata.indexOf(lowercaseSearch) !== -1

  const condition = matchesDate || matchesDescription || matchesBody || matchesTitle || matchesMetadata

  return condition
}

export const teamSearchFilter = (tMember: iTeam, search: string) => {
  const { order, name, acronym, role, body } = tMember
  const lowercaseSearch = search.toLowerCase()

  const strOrder = order.toLowerCase() 
  const matchesOrder = strOrder.indexOf(lowercaseSearch) !== -1

  const strName = name.toLowerCase()
  const matchesName = strName.indexOf(lowercaseSearch) !== -1

  const strAcronym = acronym ? acronym.toLowerCase() : ""
  const matchesAcronym = strAcronym.indexOf(lowercaseSearch) !== -1

  const strBody = body ? body.toLowerCase() : ""
  const matchesBody = strBody.indexOf(lowercaseSearch) !== -1

  const strRole = role.toLowerCase()
  const matchesRole = strRole.indexOf(lowercaseSearch) !== -1

  const condition = matchesOrder || matchesName || matchesAcronym || matchesBody || matchesRole

  return condition
}

export const blogSearchFilter = (blog: iBlog, search: string, body?: string) => {
  const { date, title, description, tags } = blog
  const lowercaseSearch = search.toLowerCase()

  const strDate = formatDate(date).toLowerCase()
  const matchesDate = strDate.indexOf(lowercaseSearch) !== -1
  
  const strTitle = title.toLowerCase()
  const matchesTitle = strTitle.indexOf(lowercaseSearch) !== -1

  const strDescription = description.toLowerCase()
  const matchesDescription = strDescription.indexOf(lowercaseSearch) !== -1
  
  const strTags = tags?.flat().toString().toLowerCase()
  const matchesTags = strTags?.indexOf(lowercaseSearch) !== -1

  const strBody = body?.toLowerCase()
  const matchesBody = strBody?.indexOf(lowercaseSearch) !== -1

  const condition = matchesDate || matchesTitle || matchesDescription || matchesTags || matchesBody

  return condition
}

export const memberSearchFilter = (member: iMember, search: string, body: string) => {
  const { acronym, category, fullname } = member
  const lowercaseSearch = search.toLowerCase()
  
  const strAcronym = acronym.toLowerCase()
  const matchesAcronym = strAcronym.indexOf(lowercaseSearch) !== -1

  const strCategory = category.toLowerCase()
  const matchesCategory = strCategory.indexOf(lowercaseSearch) !== -1

  const strFullname = fullname.toLowerCase()
  const matchesFullname = strFullname.indexOf(lowercaseSearch) !== -1

  const strBody = body.toLowerCase()
  const matchesBody = strBody.indexOf(lowercaseSearch) !== -1

  const condition = matchesAcronym || matchesCategory || matchesFullname || matchesBody

  return condition
}

export const handlePlayEvent = (evt: Event) => {
  const target = evt.target as HTMLAudioElement
  const targetTitle = target.getAttribute(Constants.DATATITLE)
  stopAllAudio(targetTitle as string)
}

export const stopAllAudio = (toPlayTitle?: string) => {

  const audioEls = document.querySelectorAll("audio") as NodeListOf<HTMLAudioElement>

  audioEls.forEach((audioEl: HTMLAudioElement) => {
    if (toPlayTitle === undefined) {
      audioEl.pause()
    } else {
      const title = audioEl.getAttribute(Constants.DATATITLE)
      if (!audioEl.paused && title !== toPlayTitle) {
        audioEl.pause() 
      }
    }
  })
}

export interface iPaginate {
  list: any[];
  page: string;
  size: number;
  url: URL;
}

interface iPathstring {
  main: string;
  secondary: string
}

export const getPathString = (pathname: string): iPathstring => {
  const path = pathname.split("/").filter(item => item !== "")

  const pathString: iPathstring = {
    main: path.length === 0 ? Constants.HOME : path[path.length - 1],
    secondary: path.length > 1 ? path[1] : ""
  }
  return pathString
}

export  const getParams = () => {
  const url = new URL(location.href)
  return {
    url,
    obj: Object.fromEntries(url.searchParams.entries())
  }
}

export const paginate = (options: iPaginate): iPage => {
  const { list, size, url, page } = options
  

  const listLength = list.length
  const totalPages = Math.ceil(listLength / size)
  const prevUrlId = Number(page) < 2 ? undefined : Number(page) - 1
  const nextUrlId = Number(page) === totalPages ? undefined : Number(page) + 1;

  const end = Number(page) * size
  const start = end - size 

  const data = list.slice(start, end)

  const prevURLObj = new URL(url)
  const nextURLObj = new URL(url)

  prevURLObj.searchParams.set("page", prevUrlId as unknown as string)
  nextURLObj.searchParams.set("page", nextUrlId as unknown as string)
  url.searchParams.set("page", page)
  
  const current = url.href
  const prevUrl = prevUrlId === undefined ? undefined : prevURLObj.href
  const nextUrl = nextUrlId === undefined ? undefined : nextURLObj.href

  return {
    data,
    start,
    end,
    currentPage: Number(page),
    lastPage: totalPages,
    size,
    total: totalPages,
    url: {
      prev: prevUrl,
      next: nextUrl,
      current
    }
  }
}
