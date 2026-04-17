import { create } from 'zustand'
import {
  type Post,
  type Comment,
  type Notification,
  type SpaceKey,
  type User,
  mockPosts,
  mockComments,
  mockNotifications,
  mockUsers,
  adminUser,
} from '../data/mockData'

interface AppState {
  activeUserId: string
  currentSpace: SpaceKey
  selectedSchool: string | null
  selectedTag: string | null
  posts: Post[]
  comments: Comment[]
  notifications: Notification[]
  isNewPostModalOpen: boolean
  newPostDraft: Partial<Post>
  // auth
  login: (userId: string) => void
  logout: () => void
  // actions
  setSpace: (space: SpaceKey) => void
  setSchoolFilter: (school: string | null) => void
  setTagFilter: (tag: string | null) => void
  openNewPostModal: () => void
  closeNewPostModal: () => void
  submitPost: (post: Post) => void
  reactToPost: (postId: string) => void
  supportClaim: (postId: string) => void
  addComment: (postId: string, body: string) => void
  respondToClaim: (postId: string, response: string, newStatus: string) => void
  markNotificationsRead: () => void
  markNotificationRead: (id: string) => void
}

export function getActiveUser(userId: string): User {
  return mockUsers.find((u) => u.id === userId) ?? mockUsers[0]
}

export const useAppStore = create<AppState>((set) => ({
  activeUserId: 'u1',
  currentSpace: 'lounge',
  selectedSchool: null,
  selectedTag: null,
  posts: mockPosts,
  comments: mockComments,
  notifications: mockNotifications,
  isNewPostModalOpen: false,
  newPostDraft: {},

  login: (userId) => set({ activeUserId: userId }),

  logout: () => set({ activeUserId: '' }),

  setSpace: (space) => set({ currentSpace: space, selectedTag: null }),

  setSchoolFilter: (school) => set({ selectedSchool: school }),

  setTagFilter: (tag) => set({ selectedTag: tag }),

  openNewPostModal: () => set({ isNewPostModalOpen: true }),

  closeNewPostModal: () => set({ isNewPostModalOpen: false, newPostDraft: {} }),

  submitPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
      isNewPostModalOpen: false,
      newPostDraft: {},
    })),

  reactToPost: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId
          ? { ...p, reactions: p.reacted ? p.reactions - 1 : p.reactions + 1, reacted: !p.reacted }
          : p
      ),
    })),

  supportClaim: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              supportCount: p.supported
                ? (p.supportCount ?? 0) - 1
                : (p.supportCount ?? 0) + 1,
              supported: !p.supported,
            }
          : p
      ),
    })),

  addComment: (postId, body) =>
    set((state) => {
      const newComment: Comment = {
        id: `c_${Date.now()}`,
        postId,
        userId: state.activeUserId,
        body,
        timestamp: new Date().toISOString(),
      }
      return {
        comments: [...state.comments, newComment],
        posts: state.posts.map((p) =>
          p.id === postId ? { ...p, comments: p.comments + 1 } : p
        ),
      }
    }),

  respondToClaim: (postId, response, newStatus) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              officialResponse: response,
              officialResponseBy: adminUser.name,
              officialResponseAt: new Date().toISOString(),
              hasOfficialResponse: true,
              claimStatus: newStatus as Post['claimStatus'],
            }
          : p
      ),
    })),

  markNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
}))
