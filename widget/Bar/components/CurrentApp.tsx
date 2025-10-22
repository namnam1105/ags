import { Accessor, createBinding, createState, With } from "ags"
import { Gtk } from "ags/gtk4"
import Hyprland from "gi://AstalHyprland"

export function CurrentApp() {
  const hypr = Hyprland.get_default()
  const client = hypr.get_focused_client()
  const [labelText, setText] = createState("")
  const [classText, setClass] = createState("")
  if (client && client != null) {
    setText(client.title ? client.title : "")
    setClass(client.class ? client.class : "")
  }
  function update() {
    const fc = hypr.get_focused_client()
    if (fc && fc != null) {
      setText(fc.title != null && fc.title ? fc.title : "")
      setClass(fc.class != null && fc.class ? fc.class : "")
    }
    fc.connect("notify::title", update)
  }
  hypr.connect("notify::focused-client", update)
  return (
    // <With value={labelText}>
    <box class={"curApp"} spacing={0} orientation={Gtk.Orientation.VERTICAL}>
      <label
        class={"class"}
        maxWidthChars={45}
        halign={Gtk.Align.START}
        label={classText}
      />
      <label class={"title"} maxWidthChars={45} label={labelText} />
    </box>
    // </With>
  )
}
