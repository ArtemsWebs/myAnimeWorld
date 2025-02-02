import { z } from 'zod';

export const ConfidantionalSettingSchema = z.object({
  pushOnDesktop: z.boolean().optional().default(false),
  showUnreadChatMessage: z.boolean().optional().default(true),
  showTimeLastFriends: z.boolean().optional().default(false),
  timeLastFriendsFormat: z.boolean().optional(),
  showPhoneFriends: z.boolean().optional().default(false),
  phoneFriendsFormat: z.boolean().optional(),
  showFIOFriends: z.boolean().optional().default(false),
  FIOFriendsFormat: z.boolean().optional(),
  showBirthdayFriends: z.boolean().optional().default(false),
  birthdayFriendsFormat: z.boolean().optional(),
});
