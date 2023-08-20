import CMS from "@staticcms/core";
import "@staticcms/core/dist/main.css"

CMS.init({
  config: {
    backend: {
      name: "git-gateway",
      branch: "master"
    },
    media_folder: "public/images/uploads",
    public_folder: "/images/uploads",
    collections: [
      {
        name: "event",
        label: "Event",
        folder: "src/content/events",
        create: true,
        slug: "{{title}}",
        fields: [
          {
            label: "Layout",
            name: "layout",
            widget: "hidden",
            default: "../../layouts/Events.astro",
          },
          {
            label: "Active",
            name: "active",
            widget: "boolean",
            default: true,
          },
          {
            label: "Name",
            name: "name",
            widget: "string",
          },
          {
            label: "Subline",
            name: "subline",
            widget: "string",
          },
          {
            label: "Logo (high resolution square)",
            name: "logo",
            widget: "image",
          },
          {
            label: "Body",
            name: "body",
            widget: "markdown",
          }
        ]
      },
      {
        name: "slider",
        label: "Slider",
        folder: "src/content/sliders",
        create: true,
        slug: "{{name}}",
        fields: [
          {
            label: "Layout",
            name: "layout",
            widget: "hidden",
            default: "../../layouts/SliderLayout.astro"
          },
          {
            label: "Event Date",
            name: "date",
            widget: "datetime",
            date_format: "ddd MMM DD, YYYY",
          },
          {
            label: "Name",
            name: "name",
            widget: "string"
          },
          {
            label: "Desktop Image (1326 x 602px)",
            name: "desktopimage",
            widget: "image"
          },
          {
            label: "Mobile Image (768 x 349px)",
            name: "mobileimage",
            widget: "image"
          },
          {
            label: "Body",
            name: "body",
            widget: "markdown",
            required: false
          }
        ]
      },
      {
        name: "member",
        label: "Member",
        folder: "src/content/members",
        create: true,
        slug: "{{name}}",
        fields: [
          {
            label: "Layout",
            name: "layout",
            widget: "hidden",
            default: "../../layouts/MemberLayout.astro"
          },
          {
            label: "Name",
            name: "name",
            widget: "string",
          },
          {
            label: "Caption (What they do)",
            name: "caption",
            widget: "string",
          },
          {
            label: "Logo (800 x 800 or any highres dimesion) .webp",
            name: "logo",
            widget: "image"
          },
          {
            label: "Body",
            name: "body",
            widget: "markdown"
          }
        ]
      }
    ]
  }
})