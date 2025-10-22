import app from "ags/gtk4/app"
import Bar from "./widget/Bar/Bar"
import { applyCSS } from "./common/css"

applyCSS()
app.start({
  main() {
    app.get_monitors().map(Bar)
  },
})
