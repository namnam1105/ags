import { createBinding, createState, With } from "ags"
import { currentTimeSec, currentDate } from "../../../common/vars"
import { Gtk } from "ags/gtk4"

export function Clock() {
  const [timeAndDate, setTime] = createState([currentTimeSec, currentDate])
  return (
    <box class="clock">
      <With value={timeAndDate}>{([time, _]) => <label label={time} />}</With>
      <label label=" • " />
      <With value={timeAndDate}>{([_, date]) => <label label={date} />}</With>
    </box>
  )
}
