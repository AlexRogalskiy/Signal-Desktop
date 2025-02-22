// Copyright 2022 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import React from 'react';
import { v4 as uuid } from 'uuid';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import type { AttachmentType } from '../types/Attachment';
import type { PropsType } from './Stories';
import { Stories } from './Stories';
import enMessages from '../../_locales/en/messages.json';
import { setupI18n } from '../util/setupI18n';
import { getDefaultConversation } from '../test-both/helpers/getDefaultConversation';
import {
  fakeAttachment,
  fakeThumbnail,
} from '../test-both/helpers/fakeAttachment';
import * as durations from '../util/durations';

const i18n = setupI18n('en', enMessages);

const story = storiesOf('Components/Stories', module);

function createStory({
  attachment,
  group,
  timestamp,
}: {
  attachment?: AttachmentType;
  group?: { title: string };
  timestamp: number;
}) {
  const replies = Math.random() > 0.5;
  let hasReplies = false;
  let hasRepliesFromSelf = false;
  if (replies) {
    hasReplies = true;
    hasRepliesFromSelf = Math.random() > 0.5;
  }

  const sender = getDefaultConversation();

  return {
    conversationId: sender.id,
    group,
    stories: [
      {
        attachment,
        hasReplies,
        hasRepliesFromSelf,
        isMe: false,
        isUnread: Math.random() > 0.5,
        messageId: uuid(),
        sender,
        timestamp,
      },
    ],
  };
}

const getDefaultProps = (): PropsType => ({
  hiddenStories: [],
  i18n,
  openConversationInternal: action('openConversationInternal'),
  preferredWidthFromStorage: 380,
  renderStoryViewer: () => <div />,
  stories: [
    createStory({
      attachment: fakeAttachment({
        thumbnail: fakeThumbnail('/fixtures/tina-rolf-269345-unsplash.jpg'),
      }),
      timestamp: Date.now() - 2 * durations.MINUTE,
    }),
    createStory({
      attachment: fakeAttachment({
        thumbnail: fakeThumbnail(
          '/fixtures/koushik-chowdavarapu-105425-unsplash.jpg'
        ),
      }),
      timestamp: Date.now() - 5 * durations.MINUTE,
    }),
    createStory({
      group: { title: 'BBQ in the park' },
      attachment: fakeAttachment({
        thumbnail: fakeThumbnail(
          '/fixtures/nathan-anderson-316188-unsplash.jpg'
        ),
      }),
      timestamp: Date.now() - 65 * durations.MINUTE,
    }),
    createStory({
      attachment: fakeAttachment({
        thumbnail: fakeThumbnail('/fixtures/snow.jpg'),
      }),
      timestamp: Date.now() - 92 * durations.MINUTE,
    }),
    createStory({
      attachment: fakeAttachment({
        thumbnail: fakeThumbnail('/fixtures/kitten-1-64-64.jpg'),
      }),
      timestamp: Date.now() - 164 * durations.MINUTE,
    }),
    createStory({
      group: { title: 'Breaking Signal for Science' },
      attachment: fakeAttachment({
        thumbnail: fakeThumbnail('/fixtures/kitten-2-64-64.jpg'),
      }),
      timestamp: Date.now() - 380 * durations.MINUTE,
    }),
    createStory({
      attachment: fakeAttachment({
        thumbnail: fakeThumbnail('/fixtures/kitten-3-64-64.jpg'),
      }),
      timestamp: Date.now() - 421 * durations.MINUTE,
    }),
  ],
  toggleHideStories: action('toggleHideStories'),
  toggleStoriesView: action('toggleStoriesView'),
});

story.add('Blank', () => <Stories {...getDefaultProps()} stories={[]} />);

story.add('Many', () => <Stories {...getDefaultProps()} />);
