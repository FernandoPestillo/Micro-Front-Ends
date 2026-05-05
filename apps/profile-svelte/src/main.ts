import { mount } from 'svelte';
import UserProfile from './UserProfile.svelte';

const rootElement = document.getElementById('root');

if (rootElement) {
  mount(UserProfile, { target: rootElement });
}
