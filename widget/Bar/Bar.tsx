import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { createPoll } from "ags/time"
import { Workspaces } from "./components/Workspaces"
import { CurrentApp } from "./components/CurrentApp"
import { Clock } from "./components/Clock"
import style from "./style.scss"
import { MediaModule } from "./components/MediaModule"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox class="centerbox">
        <box $type="start" class="start">
          <CurrentApp />
        </box>
        <box $type="center" class="center">
          <MediaModule />
          <Workspaces />
          <Clock />
        </box>
      </centerbox>
      {/* <box $type="center" class="center">
        <Clock />
      </box> */}
    </window>
  )
}
