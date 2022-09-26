export class ObserverService {
  namePick = ''

  constructor(name: string) {
    this.namePick = name
  }

  public updateStatus(location: string): string {
    return this.pingGotoHelp(location)
  }

  public pingGotoHelp(location: string): string {
    console.log(`${this.namePick}     --- PING ---     ${location}`)
    return `${this.namePick}     --- PING ---     ${location}`
  }
}
