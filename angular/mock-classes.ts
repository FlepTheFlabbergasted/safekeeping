import { signal } from '@angular/core';
import { BehaviorSubject, Observable, of, skip } from 'rxjs';

export class BreakpointObserverMock {
  private state: BehaviorSubject<Record<string, object>> = new BehaviorSubject({});

  resize(breakpoint: string) {
    this.state.next({ breakpoints: { [breakpoint]: true } });
  }

  observe(): Observable<Record<string, object>> {
    return this.state.asObservable().pipe(skip(1));
  }

  destroy(): void {
    this.state.complete();
  }
}

export class AuthServiceMock {
  userHasRole = jest.fn(() => signal(true));
}

export class LocationMock {
  reload = jest.fn();
}

export class ElementMock {
  style = { setProperty: jest.fn() };
  setAttribute = jest.fn();
  click = jest.fn();
  remove = jest.fn();
}

export class DocumentMock {
  activeElement = { tagName: 'body' };
  body = { appendChild: jest.fn() };
  documentElement = new ElementMock();
  defaultView = { URL: { createObjectURL: jest.fn(() => 'objectUrl'), revokeObjectURL: jest.fn() } };

  createElement = jest.fn(() => new ElementMock());
}

export class WindowMock {
  innerWidth = 420;
  window = { AudioContext: jest.fn(() => new AudioContextMock()) };
  localStorage = { setItem: jest.fn(), getItem: jest.fn() };

  addEventListener = jest.fn();
  removeEventListener = jest.fn();
  getComputedStyle = jest.fn(() => ({ getPropertyValue: this.getPropertyValueMock }));
  confirm = jest.fn();

  getPropertyValueMock = jest.fn();

  document = new DocumentMock();
  location = new LocationMock();
}

export class RouterMock {
  routerState = { root: { queryParams: {} } };

  createUrlTree = jest.fn();
  navigate = jest.fn();
  navigateByUrl = jest.fn();

  constructor(public queryParams: any = {}) {
    this.routerState.root.queryParams = this.queryParams;
  }
}

export class GainNodeMock {
  setTargetAtTimeMock = jest.fn();

  gain = { value: 0.69, setTargetAtTime: this.setTargetAtTimeMock };

  connect = jest.fn();
  disconnect = jest.fn();
}

export class BufferSourceNodeMock {
  loop = false;
  buffer = {};

  connect = jest.fn();
  disconnect = jest.fn();
  start = jest.fn();
  stop = jest.fn();
}

export class AudioContextMock {
  destination = {};
  currentTime = 1337;

  createGain = jest.fn(() => new GainNodeMock());
  createBufferSource = jest.fn(() => new BufferSourceNodeMock());
  decodeAudioData = jest.fn();
}

export class AudioPlayerServiceMock {
  addAudioPlayer = jest.fn();
  clearAudioPlayer = jest.fn();
  fetchAudioPlayerBuffer = jest.fn();
  mute = jest.fn();
  pause = jest.fn();
  play = jest.fn();
  removeAudioPlayer = jest.fn();
  removeStem = jest.fn();
  seek = jest.fn();
  setAsSolo = jest.fn();
  setGain = jest.fn();
  changeGain = jest.fn();
  changeGainEnd = jest.fn();
  setStemFamilyId = jest.fn();
  setTitle = jest.fn();
  startSeeking = jest.fn();
  stop = jest.fn();
  stopSeeking = jest.fn();
  togglePlayPause = jest.fn();
  unmute = jest.fn();
  unsetAsSolo = jest.fn();

  audioContext = new AudioContextMock();
}

export class ActivatedRouteMock {
  getMock: jest.Mock<any, any> = jest.fn(() => undefined);
  snapshot = { queryParamMap: { get: this.getMock }, params: {} };

  constructor(public data: any = {}, public queryParams: any = {}, public params: any = {}) {}
}

export class ActivatedRouteSnapshotMock {
  snapshot = { params: {} };

  constructor(public params: any = {}, public queryParams: any = {}) {
    this.snapshot.params = params;
  }
}

export class RouterStateSnapshotMock {
  url = 'url mock';

  constructor(public params: any = {}, public queryParams: any = {}) {}
}

export class DialogMock {
  open = jest.fn(() => ({ afterClosed: this.afterClosedMock }));

  afterClosedMock: jest.Mock<any, any> = jest.fn(() => of(undefined));

  reset() {
    this.afterClosedMock.mockReturnValue(of(undefined));
  }
}

export class DialogRefMock {
  close = jest.fn();
}

export class MatSnackBarMock {
  open = jest.fn();
  openFromComponent = jest.fn();
}
