import { PropsWithChildren, ReactNode } from 'react';

type VisuallyHiddenProps = {
  children: ReactNode;
  [x: string]: unknown;
};

function VisuallyHidden({
  children,
  ...delegated
}: PropsWithChildren<VisuallyHiddenProps>) {
  return (
    <span className="visually-hidden" {...delegated}>
      {children}
    </span>
  );
}

export default VisuallyHidden;
