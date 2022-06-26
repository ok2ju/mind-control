import { ReactNode } from 'react';
import { Link as WouterLink, useRoute } from 'wouter';

type Props = {
  href: string,
  children: ReactNode,
};

const Link = ({ href, children, ...rest }: Props) => {
  const [active] = useRoute(href);

  return (
    <WouterLink
      {...rest}
      href={href}
      // TODO: consider to use `classnames` here
      className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 ${active ? 'bg-gray-900' : ''}`}
    >
      {children}
    </WouterLink>
  );
};

export default Link;
