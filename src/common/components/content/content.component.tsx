import React from 'react';

export default function ContentComponent(props: { children: React.ReactNode; className?: string }) {
  const { children, className } = props;
  return <main className={`content ${className ? className : ''}`}>{children}</main>;
}
