import {ReactNode} from 'react'
import {IInputTextProps} from './InputText.types'

type iconPositionType = 'start' | 'end'
export type strength = [string, string, string, string]

export interface IInputTextPasswordProps extends IInputTextProps {
  /**
   * Boolean that if set to true toggle visiblity icon of password should show
   *
   * *@type {?boolean}
   * @default true
   */
  shoudlShowIcon?: boolean

  /**
   * Proprety that indicates the position of the icon inside the input
   *
   * @type {?iconPositionType}
   * @default "end"
   */
  iconPosition?: iconPositionType

  /**
   * SVG icon for visible password
   *
   * *@type {?ReactNode}
   * @default null
   */
  visibleIcon?: ReactNode

  /**
   * SVG icon for hidden password
   *
   * *@type {?ReactNode}
   * @default null
   */
  hiddenIcon?: ReactNode

  /**
   * Boolean that is set to fasle will hide the password strength
   *
   * *@type {?boolean}
   * @default true
   */
  shouldShowPasswordStrength?: boolean

  /**
   * Array of 4 colors to pass for the component to sepcify the colors of the strength meter.
   *
   * @type {?strength}
   * @default ['#FF0909', '#FF9900','#0099FF','#00FF99']
   *
   */
  strengthColorList?: strength
}
