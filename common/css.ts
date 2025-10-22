import app from "ags/gtk4/app"
import { monitorFile } from "ags/file"
import { exec } from "ags/process"

function compileSCSS(file: string) {
  const outFile = "/tmp/" + file.replace(".scss", ".css")
  exec(`sass --no-source-map ${file} ${outFile}`)
  app.apply_css(outFile)
}

export function applyCSS() {
  const cssFiles = exec("find -L . -iname *.scss").split("\n")
  cssFiles.forEach((file) => {
    compileSCSS(file)
  })
}
