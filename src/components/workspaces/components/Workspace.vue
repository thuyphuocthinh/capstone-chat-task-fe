<template>
  <template v-if="workspaces.length == 0 && !isSearch">
    <a-result title="You have no workspace to start. Please contact admin."> </a-result>
  </template>
  <div class="workspace-ctn" v-else>
    <div class="workspace-welcome">Welcome to Slack, choose a workspace to start</div>
    <!-- search -->
    <div class="workspace-search">
      <a-input-search
        v-model:value="searchTitle"
        placeholder="Search workspaces"
        :loading="false"
        @keydown.enter="handleSearch"
      />
    </div>
    <!-- list -->
    <div class="workspace-list" v-if="workspaces && workspaces.length > 0">
      <div class="workspace-item" v-for="workspace in workspaces" :key="workspace.id">
        <div class="workspace-item__left">
          <div class="workspace-item__left-image">
            {{ workspace.name.charAt(0) }}
          </div>
          <div class="workspace-item__left-name">
            {{ workspace.name }}
          </div>
        </div>
        <div class="workspace-item__right">
          <a-button>Open</a-button>
        </div>
      </div>
    </div>
    <div class="workspace-list" v-else>
      <a-empty />
    </div>
    <!-- pagination -->
    <div
      class="workspace-pagination"
      v-if="workspaces_metadata && workspaces_metadata?.totalElements > 0"
    >
      <a-pagination
        v-model:current="current"
        :total="workspaces_metadata?.totalElements"
        show-less-items
        @change="changePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue'
import type { Gc as IGc } from '#/Gc'

const Gc = inject('Gc') as typeof IGc
const { useRouter, useRoute } = Gc['router']
const { debounce_search } = Gc['modules']['debounce_search']
const route = useRoute()
const router = useRouter()

const { workspaces, workspaces_metadata, load_more_workspaces_store, find_workspaces_store } =
  Gc['stores']['workspace_store']
const current = ref<number>(workspaces_metadata.value?.currentPage || 1)
const searchTitle = ref<string>('')
const isSearch = ref<boolean>(false)

const changePage = async (page: number, pageSize: number): Promise<void> => {
  if (!isSearch) {
    await load_more_workspaces_store(page)
  } else {
    await find_workspaces_store(searchTitle.value, page)
  }
  router.push({
    name: 'workspace',
    query: {
      page,
    },
  })
}

onMounted(() => {
  const page = Number(route.query.page)
  router.push({
    name: 'workspace',
    query: {
      page: page || 1,
    },
  })
})

const handleSearch = async (): Promise<void> => {
  await find_workspaces_store(searchTitle.value)
}

watch(searchTitle, async (newVal) => {
  isSearch.value = true
  debounce_search(searchTitle.value, find_workspaces_store, 300)
})
</script>

<style scoped>
.workspace-ctn {
  display: flex;
  flex-direction: column;
  max-width: 550px;
  width: 95%;
  margin: auto;
  background: var(--color-white);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  margin-top: var(--space-xl);
  gap: var(--space-md);
}

.workspace-welcome {
  font-weight: 600;
  text-align: center;
  font-size: var(--font-lg);
  margin-bottom: var(--space-md);
}

.workspace-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.workspace-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.workspace-item__left {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.workspace-item__left-name {
  font-weight: 600;
}

.workspace-item__left-image {
  width: 30px;
  height: 30px;
  font-weight: 600;
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
}

.workspace-pagination {
  display: flex;
  justify-content: center;
}
</style>
