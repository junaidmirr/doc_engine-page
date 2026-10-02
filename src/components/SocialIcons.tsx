import React from 'react';

export const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 14, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const XIcon: React.FC<{ size?: number; className?: string }> = ({ size = 13, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const RedditIcon: React.FC<{ size?: number; className?: string }> = ({ size = 14, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.955 11.455c.045.2.045.41.045.614 0 2.114-2.455 3.818-5.477 3.818s-5.477-1.705-5.477-3.818c0-.205.023-.41.045-.614a1.737 1.737 0 01-.818-1.455c0-.955.773-1.727 1.727-1.727.477 0 .909.205 1.227.523 1.045-.727 2.455-1.182 4.023-1.25l.818-3.864a.34.34 0 01.409-.273l2.682.568c.205-.341.568-.568.977-.568.636 0 1.159.523 1.159 1.159 0 .636-.523 1.159-1.159 1.159a1.16 1.16 0 01-1.159-1.045l-2.386-.5-0.682 3.295c1.523.091 2.886.545 3.909 1.25.318-.318.75-.523 1.227-.523.955 0 1.727.773 1.727 1.727 0 .591-.318 1.114-.818 1.455zm-8.318.273c0-.614-.5-1.114-1.114-1.114s-1.114.5-1.114 1.114.5 1.114 1.114 1.114 1.114-.5 1.114-1.114zm6.091 1.114c.614 0 1.114-.5 1.114-1.114s-.5-1.114-1.114-1.114-1.114.5-1.114 1.114.5 1.114 1.114 1.114zm-5.409 1.727c-.114-.114-.114-.295 0-.409.114-.114.295-.114.409 0 .864.864 2.477.864 3.341 0 .114-.114.295-.114.409 0 .114.114.114.295 0 .409-1.068 1.068-3.091 1.068-4.159 0z"
    />
  </svg>
);

export interface SocialLinkItem {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/junaidmirr/doc-engine.git',
    icon: <GithubIcon size={14} />,
  },
  {
    id: 'x',
    name: 'X',
    url: 'https://x.com/docengine_',
    icon: <XIcon size={13} />,
  },
  {
    id: 'reddit',
    name: 'Reddit',
    url: 'https://www.reddit.com/user/Strong_Aardvark_7868/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button',
    icon: <RedditIcon size={14} />,
  },
];

interface SocialButtonsProps {
  className?: string;
  showLabels?: boolean;
}

export const SocialButtons: React.FC<SocialButtonsProps> = ({
  className = '',
  showLabels = true,
}) => {
  return (
    <div className={`social-buttons-group ${className}`}>
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
          title={`Visit our ${social.name}`}
          aria-label={social.name}
        >
          <span className="social-icon">{social.icon}</span>
          {showLabels && <span className="social-label">{social.name}</span>}
        </a>
      ))}
    </div>
  );
};
