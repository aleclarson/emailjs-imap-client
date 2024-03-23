export const LOG_LEVEL_NONE = 1000
export const LOG_LEVEL_ERROR = 40
export const LOG_LEVEL_WARN = 30
export const LOG_LEVEL_INFO = 20
export const LOG_LEVEL_DEBUG = 10
export const LOG_LEVEL_ALL = 0

export const TIMEOUT_CONNECTION = 90 * 1000 // Milliseconds to wait for the IMAP greeting from the server
export const TIMEOUT_NOOP = 60 * 1000 // Milliseconds between NOOP commands while idling
export const TIMEOUT_IDLE = 60 * 1000 // Milliseconds until IDLE command is cancelled

export const STATE_CONNECTING = 1
export const STATE_NOT_AUTHENTICATED = 2
export const STATE_AUTHENTICATED = 3
export const STATE_SELECTED = 4
export const STATE_LOGOUT = 5

export const DEFAULT_CLIENT_ID = {
  name: 'emailjs-imap-client',
}

export interface AuthObject {
  user?: string
  pass?: string
  xoauth2?: string
}

export interface ClientOptions {
  id?: { name: string }
  enableCompression?: boolean
  auth?: AuthObject
  requireTLS?: boolean
  ignoreTLS?: boolean
  logLevel?: number
}

export interface MailboxInfo {
  readOnly: boolean
  exists: number
  flags: string[]
  permanentFlags: string[]
  uidValidity: number
  uidNext: number
  highestModseq: string
  noModseq: boolean
}

export interface MessageInfo {
  '#': number
  uid: number
  modseq: string
  flags: string[]
  xGmLabels: string[]
  envelope: any
  bodystructure: any
}

export interface Mailbox {
  name: string
  delimiter: string
  path: string
  children: Mailbox[]
  flags: string[]
  listed: boolean
  subscribed: boolean
  specialUse: string
  specialUseFlag: string
}

export default class Client {
  constructor(host?: string, port?: number, options?: ClientOptions)

  oncert: (cert: any) => void
  onupdate: (path: string, type: string, data: any) => void
  onselectmailbox: (path: string, info: MailboxInfo) => void
  onclosemailbox: (path: string) => void

  connect(): Promise<void>
  openConnection(): Promise<string[]>
  logout(): Promise<void>
  close(err?: Error): Promise<void>
  updateId(id?: any): Promise<void>
  selectMailbox(path: string, options?: any): Promise<MailboxInfo>
  subscribeMailbox(path: string): Promise<void>
  unsubscribeMailbox(path: string): Promise<void>
  listNamespaces(): Promise<any>
  listMailboxes(): Promise<Mailbox>
  createMailbox(path: string): Promise<void>
  deleteMailbox(path: string): Promise<void>
  listMessages(
    path: string,
    sequence: string,
    items?: any[],
    options?: any
  ): Promise<MessageInfo[]>
  search(path: string, query: any, options?: any): Promise<number[]>
  setFlags(
    path: string,
    sequence: string,
    flags: any,
    options?: any
  ): Promise<MessageInfo[]>
  store(
    path: string,
    sequence: string,
    action: string,
    flags: any[],
    options?: any
  ): Promise<MessageInfo[]>
  upload(destination: string, message: string, options?: any): Promise<string>
  deleteMessages(path: string, sequence: string, options?: any): Promise<void>
  copyMessages(
    path: string,
    sequence: string,
    destination: string,
    options?: any
  ): Promise<any>
  moveMessages(
    path: string,
    sequence: string,
    destination: string,
    options?: any
  ): Promise<void>
  compressConnection(): Promise<void>
  login(auth: AuthObject): Promise<void>
  exec(request: any, acceptUntagged?: any[], options?: any): Promise<any>
  enterIdle(): void
  breakIdle(): void
  upgradeConnection(): Promise<void>
  updateCapability(forced?: boolean): Promise<void>
  hasCapability(capa?: string): boolean
  getOkGreeting(): string
}
