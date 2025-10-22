import AstalMpris from "gi://AstalMpris"
import { createBinding, With } from "gnim"

function getTitle(player: AstalMpris.Player): string {
  return player.artist
    ? `${player.artist}: ${player.title}`
    : player.album
    ? `${player.album}: ${player.title}`
    : `${player.title}`
}

export function MediaModule() {
  const mpris = AstalMpris.get_default()
  return (
    <box class={"mediamodule"}>
      <With value={createBinding(mpris, "players")}>
        {(players: Array<AstalMpris.Player>) =>
          players[0] ? (
            <button class={"media"} onClicked={() => players[0].play_pause()}>
              <label
                class={createBinding(players[0], "playbackStatus").as((s) =>
                  s > 0 ? "paused" : "playing"
                )}
                maxWidthChars={80}
                label={createBinding(players[0], "metadata").as(() =>
                  getTitle(players[0])
                )}
              />
            </button>
          ) : (
            <box />
          )
        }
      </With>
    </box>
  )
}
