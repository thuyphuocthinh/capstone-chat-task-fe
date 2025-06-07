<template>
  <div class="tab-left-ctn">
    <div
      class="tab-item"
      v-for="tab in list_tabs"
      :key="tab.name"
      :class="{
        'tab-item--active': is_tab_active(tab),
      }"
    >
      <router-link :to="tab.to">
        <img :src="tab.icon" />
        <span> {{ tab.name }} </span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { inject, computed } from 'vue'
import type { Gc as IGc } from '#/Gc'

const Gc = inject('Gc') as typeof IGc

const { useRoute } = Gc['router']

const routeName = computed(() => {
  return route.name as string
})

const route = useRoute()

interface i_tab {
  name: string
  icon: string
  active: boolean
  routeName: string
  to: string
}

const is_tab_active = (tab: i_tab): boolean => {
  return typeof tab.routeName === 'string' && routeName.value === tab.routeName
}

const list_tabs = ref<Array<i_tab>>([
  {
    name: 'Group chat',
    icon: 'data:image/svg+xml,%3Csvg%20fill%3D%22%23000000%22%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2024%2024%22%20id%3D%22chat%22%20data-name%3D%22Line%20Color%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20class%3D%22icon%20line-color%22%3E%3Cpath%20id%3D%22primary%22%20d%3D%22M18.81%2C16.23%2C20%2C21l-4.95-2.48A9.84%2C9.84%2C0%2C0%2C1%2C12%2C19c-5%2C0-9-3.58-9-8s4-8%2C9-8%2C9%2C3.58%2C9%2C8A7.49%2C7.49%2C0%2C0%2C1%2C18.81%2C16.23Z%22%20style%3D%22fill%3A%20none%3B%20stroke%3A%20rgb(0%2C%200%2C%200)%3B%20stroke-linecap%3A%20round%3B%20stroke-linejoin%3A%20round%3B%20stroke-width%3A%202%3B%22%3E%3C/path%3E%3C/svg%3E',
    active: false,
    routeName: 'group-chat',
    to: '/chats',
  },
  {
    name: 'Private chat',
    icon: 'data:image/svg+xml,%3Csvg%20fill%3D%22%23000000%22%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2024%2024%22%20id%3D%22chat%22%20data-name%3D%22Line%20Color%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20class%3D%22icon%20line-color%22%3E%3Cpath%20id%3D%22primary%22%20d%3D%22M18.81%2C16.23%2C20%2C21l-4.95-2.48A9.84%2C9.84%2C0%2C0%2C1%2C12%2C19c-5%2C0-9-3.58-9-8s4-8%2C9-8%2C9%2C3.58%2C9%2C8A7.49%2C7.49%2C0%2C0%2C1%2C18.81%2C16.23Z%22%20style%3D%22fill%3A%20none%3B%20stroke%3A%20rgb(0%2C%200%2C%200)%3B%20stroke-linecap%3A%20round%3B%20stroke-linejoin%3A%20round%3B%20stroke-width%3A%202%3B%22%3E%3C/path%3E%3C/svg%3E',
    active: false,
    routeName: 'private-chat',
    to: '/private-chats',
  },
  {
    name: 'Thread',
    icon: 'data:image/svg+xml,%3Csvg%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M9.99999%209.21468V4.92896L2.92892%2012L9.99999%2019.0711V14.2392M10%209.22304C10.6432%209.07708%2011.3126%209.00002%2012%209.00002C16.9706%209.00002%2021%2013.0295%2021%2018C21%2018.8675%2020.8773%2019.7063%2020.6482%2020.5C19.5649%2016.7457%2016.1031%2014%2012%2014C11.3126%2014%2010.6432%2014.0771%2010%2014.223%22%20stroke%3D%22%23000000%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E',
    active: false,
    routeName: 'thread',
    to: '/threads',
  },
  {
    name: 'Task',
    icon: 'data:image/svg+xml,%3Csvg%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20fill%3D%22%23000000%22%20fill-rule%3D%22nonzero%22%20d%3D%22M10%2C4.5%20C10%2C4.77614237%209.77614237%2C5%209.5%2C5%20C9.22385763%2C5%209%2C4.77614237%209%2C4.5%20C9%2C3.67157288%209.67157288%2C3%2010.5%2C3%20L13.5%2C3%20C14.3284271%2C3%2015%2C3.67157288%2015%2C4.5%20C15%2C4.77614237%2014.7761424%2C5%2014.5%2C5%20C14.2238576%2C5%2014%2C4.77614237%2014%2C4.5%20C14%2C4.22385763%2013.7761424%2C4%2013.5%2C4%20L10.5%2C4%20C10.2238576%2C4%2010%2C4.22385763%2010%2C4.5%20Z%20M6.5%2C4%20C6.77614237%2C4%207%2C4.22385763%207%2C4.5%20C7%2C4.77614237%206.77614237%2C5%206.5%2C5%20C5.67157288%2C5%205%2C5.67157288%205%2C6.5%20L5%2C18.5%20C5%2C19.3284271%205.67157288%2C20%206.5%2C20%20L17.5%2C20%20C18.3284271%2C20%2019%2C19.3284271%2019%2C18.5%20L19%2C6.5%20C19%2C5.67157288%2018.3284271%2C5%2017.5%2C5%20C17.2238576%2C5%2017%2C4.77614237%2017%2C4.5%20C17%2C4.22385763%2017.2238576%2C4%2017.5%2C4%20C18.8807119%2C4%2020%2C5.11928813%2020%2C6.5%20L20%2C18.5%20C20%2C19.8807119%2018.8807119%2C21%2017.5%2C21%20L6.5%2C21%20C5.11928813%2C21%204%2C19.8807119%204%2C18.5%20L4%2C6.5%20C4%2C5.11928813%205.11928813%2C4%206.5%2C4%20Z%22/%3E%3Cpath%20fill%3D%22%23000000%22%20fill-rule%3D%22nonzero%22%20d%3D%22M15.1464466%2C9.14644661%20C15.3417088%2C8.95118446%2015.6582912%2C8.95118446%2015.8535534%2C9.14644661%20C16.0488155%2C9.34170876%2016.0488155%2C9.65829124%2015.8535534%2C9.85355339%20L10.8535534%2C14.8535534%20C10.6582912%2C15.0488155%2010.3417088%2C15.0488155%2010.1464466%2C14.8535534%20L8.14644661%2C12.8535534%20C7.95118446%2C12.6582912%207.95118446%2C12.3417088%208.14644661%2C12.1464466%20C8.34170876%2C11.9511845%208.65829124%2C11.9511845%208.85355339%2C12.1464466%20L10.5%2C13.7928932%20L15.1464466%2C9.14644661%20Z%22/%3E%3C/g%3E%3C/svg%3E',
    active: false,
    routeName: 'task',
    to: '/tasks',
  },
  {
    name: 'Task thread',
    icon: 'data:image/svg+xml,%3Csvg%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M9.99999%209.21468V4.92896L2.92892%2012L9.99999%2019.0711V14.2392M10%209.22304C10.6432%209.07708%2011.3126%209.00002%2012%209.00002C16.9706%209.00002%2021%2013.0295%2021%2018C21%2018.8675%2020.8773%2019.7063%2020.6482%2020.5C19.5649%2016.7457%2016.1031%2014%2012%2014C11.3126%2014%2010.6432%2014.0771%2010%2014.223%22%20stroke%3D%22%23000000%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E',
    active: false,
    routeName: 'task-thread',
    to: '/task-threads',
  },
])
</script>

<style scoped>
.tab-left-ctn {
  height: calc(100vh - 60px);
  overflow: auto;
  display: flex;
  flex-direction: column;
  background: var(--color-white);
}

.tab-item a {
  padding: var(--space-md) var(--space-sm);
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: var(--space-xs);
  color: var(--color-black);
  font-weight: 500;
  font-size: 12px;
}

.tab-item a img {
  width: 22px;
  height: 26px;
  margin: 0 auto;
}

.tab-item:hover {
  background-color: var(--color-light);
}

.tab-item--active {
  background-color: var(--color-light);
}
</style>
