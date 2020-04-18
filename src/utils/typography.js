import Typography from "typography"
import oceanBeachTheme from 'typography-theme-ocean-beach'
oceanBeachTheme.baseLineHeight = 1
oceanBeachTheme.bodyColor = "hsla(0,0%,0%,0.6)"
const typography = new Typography(oceanBeachTheme)

export const { scale, rhythm, options } = typography
export default typography
