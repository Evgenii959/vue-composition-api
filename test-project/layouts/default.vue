<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { usePostsStore } from '../stores/posts';

const store = usePostsStore();
const page = ref(1);
const pageSize = 10;
const searchQuery = ref('');
const searchTerm = ref('');
const posts = computed(() => store.posts);
const loading = computed(() => store.loading);
const hasMorePosts = computed(() => store.totalPosts > page.value * pageSize);

const filteredPosts = computed(() => {
  if (searchTerm.value) {
    return store.posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }
  return store.posts;
});

const newPost = ref({
  title: '',
  body: '',
});

const fetchPosts = async (pageNumber: number) => {
  await store.fetchPosts(pageNumber, pageSize);
};

const previousPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchPosts(page.value);
  }
};

const nextPage = () => {
  if (hasMorePosts) {
    page.value++;
    fetchPosts(page.value);
  }
};

onMounted(() => {
  fetchPosts(page.value);
});

const isModalOpen = ref(false);

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const applySearch = () => {
  searchTerm.value = searchQuery.value;
};

const createPost = async () => {
  try {
    newPost.value.id = Date.now();

    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      newPost.value
    );
    const createdPost = response.data;

    createdPost.id = createdPost.id || newPost.value.id;

    store.posts.unshift(createdPost);

    isModalOpen.value = false;
  } catch (error) {
    console.error('Failed to create post:', error);
  }
};
</script>

<template>
  <div>
    <div class="mb-4">
      <label for="search" class="block text-sm font-medium text-gray-700"
        >Search by Title</label
      >
      <input
        id="search"
        v-model="searchQuery"
        type="text"
        placeholder="Enter title"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button
        type="submit"
        @click="applySearch"
        class="px-4 py-2 bg-green-500 text-white rounded"
      >
        Search
      </button>
    </div>
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="cursor-pointer">ID</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="post in filteredPosts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center mt-4">
      <button
        @click="previousPage"
        :disabled="page === 1"
        class="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Previous
      </button>
      <span class="mx-4">{{ page }}</span>
      <button
        @click="nextPage"
        :disabled="!hasMorePosts"
        class="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>
    </div>
    <div v-if="loading" class="flex justify-center mt-4">
      <span>Loading...</span>
    </div>
    <div class="flex justify-center mt-4">
      <button
        @click="toggleModal"
        class="px-4 py-2 bg-green-500 text-white rounded"
      >
        Open Modal
      </button>
    </div>
    <!-- Модальное окно -->

    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-4 rounded">
        <h2 class="text-xl mb-4">Create New Post</h2>
        <form @submit.prevent="createPost">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700"
              >Title</label
            >
            <input
              id="title"
              v-model="newPost.title"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-4">
            <label for="body" class="block text-sm font-medium text-gray-700"
              >Body</label
            >
            <textarea
              id="body"
              v-model="newPost.body"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="isModalOpen = false"
              class="px-4 py-2 bg-gray-300 text-black rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
