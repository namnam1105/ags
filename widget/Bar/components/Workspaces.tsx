import Hyprland from "gi://AstalHyprland"
import { Gdk } from "ags/gtk4"
import { createBinding, createState, For } from "ags"

type WorkspacesProps = {
  monitor: Gdk.Monitor
}

export function Workspaces() {
  const hypr = Hyprland.get_default()
  const [wsList, setWsList] = createState(hypr.get_workspaces())

  // INFO: https://github.com/Aylur/astal/issues/284
  hypr.connect("workspace-added", (_, ws) => {
    setWsList((w) => [...w, ws])
  })
  hypr.connect("workspace-removed", (_, wsId) => {
    setWsList((w) => w.filter((w) => w.id != wsId))
  })

  const sorted = (arr: Array<Hyprland.Workspace>) => {
    return arr
      .filter((ws) => !(ws.id >= -99 && ws.id <= -2))
      .sort((a, b) => a.id - b.id)
  }

  return (
    <box class="Workspaces">
      <For each={wsList(sorted)}>
        {(ws: Hyprland.Workspace) => (
          <button
            class={createBinding(hypr, "focusedWorkspace").as((fw) =>
              ws === fw ? "active" : ""
            )}
            onClicked={() => hypr.dispatch("workspace", ws.id.toString())}
          >
            {ws.id}
          </button>
        )}
      </For>
    </box>
  )
}
