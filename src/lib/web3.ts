import { supabase } from "@/integrations/supabase/client";

// Helper to save activity completion on-chain and in database
export const saveActivityCompletion = async (
  userId: string,
  activityId: number,
  day: number,
  txHash: string,
  rewardAmount: number
) => {
  const { error } = await supabase.from('activity_completions').insert({
    user_id: userId,
    activity_id: activityId,
    day: day,
    tx_hash: txHash,
    reward_amount: rewardAmount
  });

  if (error) {
    console.error('Error saving activity:', error);
    throw error;
  }
};

// Helper to save badge mint
export const saveBadgeMint = async (
  userId: string,
  badgeId: number,
  badgeName: string,
  txHash: string,
  tokenId?: string
) => {
  const { error } = await supabase.from('badges').insert({
    user_id: userId,
    badge_id: badgeId,
    badge_name: badgeName,
    tx_hash: txHash,
    token_id: tokenId
  });

  if (error) {
    console.error('Error saving badge:', error);
    throw error;
  }
};

// Get user's completed activities
export const getUserActivities = async (userId: string, day: number) => {
  const { data, error } = await supabase
    .from('activity_completions')
    .select('*')
    .eq('user_id', userId)
    .eq('day', day);

  if (error) {
    console.error('Error fetching activities:', error);
    return [];
  }

  return data || [];
};

// Get user's total NOS balance
export const getUserNOSBalance = async (userId: string) => {
  const { data, error } = await supabase
    .from('activity_completions')
    .select('reward_amount')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching balance:', error);
    return 0;
  }

  return data.reduce((total, activity) => total + activity.reward_amount, 0);
};

// Get user's badges
export const getUserBadges = async (userId: string) => {
  const { data, error } = await supabase
    .from('badges')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching badges:', error);
    return [];
  }

  return data || [];
};
