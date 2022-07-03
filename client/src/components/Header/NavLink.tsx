import { ReactNode, MouseEvent } from 'react';
import { Link, useRoute } from 'wouter';
import { NavLinkTypes } from '../../types/nav';

type Props = {
  href?: string,
  children: ReactNode,
  type?: NavLinkTypes,
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
};

// TODO: consider to use `classnames` here
const getClassnames = (active: boolean) => `text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 ${active ? 'bg-gray-900' : ''}`;

const NavLink = ({ type = NavLinkTypes.Link, href = '', children, onClick, ...rest }: Props) => {
  const [active] = useRoute(href);

  switch (type) {
    case NavLinkTypes.Link:
      return <Link {...rest} href={href} className={getClassnames(active)}>{children}</Link>;
    case NavLinkTypes.Button:
      return (
        <button
          type="button"
          className={getClassnames(active)}
          onClick={onClick}
        >
          {children}
        </button>
      );
    default:
      return null;
  }
};

export default NavLink;
