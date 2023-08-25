---
layout: ../../layouts/ResourcesLayout.astro
active: true
name: APBN Membership Registration
description: While the APBN is open for membership by all professional bodies,
  there are some criteria that must be met. Kindly study the information below.
formtitle: Application form for membership admission
lastwidget: Account Details
inputfields:
  - field: input
    name: name
    type: text
    placeholder: Name of professional body
  - field: input
    name: address
    placeholder: Address
  - field: input
    name: telephone
    type: text
    placeholder: Telephone number(s) [separate with comma]
  - field: input
    name: email
    type: email
    placeholder: Email
  - field: input
    name: website
    type: text
    placeholder: Website
  - field: input
    name: yearofincorporation
    type: number
    placeholder: Year of Incorporation / Establishment
  - field: textarea
    name: principalofficers
    placeholder: E.g. Mr. John Hanson (President), Mrs. Jane Doe (Registrar)
  - field: textarea
    name: membership
    placeholder: E.g. Fellows (5), Associates (19), Others (50)
  - field: input
    name: minimumqualification
    type: text
    placeholder: Minimum qualification required for registering members
  - name: backedbyparliament
    field: select
    placeholder: Is your organization backed by Parliament
  - field: input
    name: parliamentdecree
    type: file
    placeholder: Upload Act / Decree
  - field: textarea
    name: activities
    placeholder: Brief outline on activities of your professional body since inception
  - field: select
    name: isaffiliate
    placeholder: Is your body affiliated to another body - locally or internationally?
  - field: textarea
    name: nameaddressofaffiliate
    placeholder: Name and address of affiliate
  - field: select
    name: abidebyrules
    placeholder: If admitted into APBN, will your professional body be willing to
      abide by the rules and regulations of the association?
  - field: textarea
    name: relevantinformation
    placeholder: Other relevant information
---
