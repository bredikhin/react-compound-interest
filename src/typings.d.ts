/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string;
  const svgComponent: SvgrComponent;
  export default svgUrl;
  export { svgComponent as ReactComponent }
}

export interface CompoundInterestInputData {
  principal: number;
  interest: number;
  annualAddition: number;
  timesPerYear: number;
  numberOfYears: number;
}

export interface CompoundInterestStyledProps {
  title?: string,
  options?: {
    withAnnualAddition: boolean,
  },
  width?: number,
  height?: number
}

export interface CompoundInterestProps {
  title: string
}

export interface CompoundInterestFieldProps {
  label: string,
  value: string,
  onChange: function,
}

type CompoundInterestFlatListItem = CompoundInterestFieldProps | () => React.ReactNode
