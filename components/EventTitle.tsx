
import React from "react";
import { normalizeDashes } from "../utils/dash-utils";

type Props = { 
  title?: string;
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode; // childrenがある場合はそれを優先または併用
};

export function EventTitle({ title, as: Component = 'h2', className = '', children }: Props) {
  const content = title ? normalizeDashes(title) : children;
  return <Component className={className}>{content}</Component>;
}
