import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [] as any[],
    loading: false,
    totalPosts: 0,
  }),
  actions: {
    async fetchPosts(page: number, limit: number) {
      this.loading = true;
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
        );
        this.posts = response.data;
        this.totalPosts = parseInt(response.headers['x-total-count'], 10);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        this.loading = false;
      }
    },
    sortById() {
      this.posts.sort((a, b) => a.id - b.id);
    },
  },
});
