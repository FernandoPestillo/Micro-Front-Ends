import { mount, unmount } from 'svelte';
import UserProfile from './UserProfile.svelte';

export function mountUserProfile(target: HTMLElement): () => void {
  const instance = mount(UserProfile, { target });

  return () => {
    unmount(instance);
  };
}
