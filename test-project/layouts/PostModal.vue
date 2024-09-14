<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-4 rounded">
      <h2 class="text-xl mb-4">Create New Post</h2>
      <form @submit.prevent="createPost">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input id="title" v-model="newPost.title" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div class="mb-4">
          <label for="body" class="block text-sm font-medium text-gray-700">Body</label>
          <textarea id="body" v-model="newPost.body" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required></textarea>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="show = false" class="px-4 py-2 bg-gray-300 text-black rounded mr-2">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePostsStore } from '../stores/posts';
import axios from 'axios';

const store = usePostsStore();
const show = ref(false);

const newPost = ref({
  title: '',
  body: ''
});

const createPost = async () => {
  try {
    await axios.post('https://jsonplaceholder.typicode.com/posts', newPost.value);
    store.fetchPosts(1, 10); // Refresh the list
    show.value = false;
  } catch (error) {
    console.error('Failed to create post:', error);
  }
};
</script>

<style scoped>
/* Tailwind CSS styles */
</style>