import { ReactNode } from 'react';

import './styles.scss';
import cx from 'classnames';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  isDark?: boolean;
  isAnswered?: boolean;
  isHighlighted?: boolean;
  children?: ReactNode;
}

export function Question({
  content,
  author,
  isDark = false,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  return (
    <div
      className={cx(
        'question',
        { dark: isDark, isAnswered },
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered },
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}