import React, { ReactElement } from "react";

const LightTheme = React.lazy(() => import("./LightTheme"));
const DarkTheme = React.lazy(() => import("./DarkTheme"));

type Props = { children: ReactElement<any, any>; isDark: boolean };

export default function ThemeSelector({ children, isDark }: Props) {
  return (
    <>
      <React.Suspense fallback={<></>}>{isDark ? <DarkTheme /> : <LightTheme />}</React.Suspense>
      {children}
    </>
  );
}
