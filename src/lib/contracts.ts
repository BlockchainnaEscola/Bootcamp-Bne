// Contract addresses on Sepolia
export const CONTRACTS = {
  STUDENT_REGISTRY: "0x0000000000000000000000000000000000000001",
  NOS_TOKEN: "0x0000000000000000000000000000000000000002",
  ACTIVITY_TRACKER: "0x0000000000000000000000000000000000000003",
  INGRESSO_BADGE: "0x0000000000000000000000000000000000000004",
};

// Simplified ABIs
export const STUDENT_REGISTRY_ABI = [
  "function registerStudent(string name, string school) external",
  "function getStudent(address student) external view returns (string name, string school, bool isRegistered)",
  "event StudentRegistered(address indexed student, string name, string school)",
];

export const NOS_TOKEN_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];

export const ACTIVITY_TRACKER_ABI = [
  "function completeActivity(uint256 activityId) external",
  "function isActivityCompleted(address student, uint256 activityId) external view returns (bool)",
  "function getCompletedActivities(address student) external view returns (uint256[])",
  "event ActivityCompleted(address indexed student, uint256 indexed activityId, uint256 reward)",
];

export const INGRESSO_BADGE_ABI = [
  "function mintBadge(address to, uint256 badgeId) external",
  "function balanceOf(address account, uint256 id) external view returns (uint256)",
  "event BadgeMinted(address indexed to, uint256 indexed badgeId)",
];
