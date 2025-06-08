import { get_list_workspaces_api, find_workspaces_api } from "#/services/workspace_services"
import type { metadata } from "#/types"
import type {
  i_workspace
} from "#/types/workspace_types"
import { ref, computed } from "vue"
import { auth_store } from "./auth_store"

export const workspaces = ref<Array<i_workspace>>([])
export const current_id_workspace = ref<string | undefined>("")
export const current_workspace = ref<i_workspace>();
export const workspaces_metadata = ref<metadata>()

const KEY_WORKSPACE = "ID_WORKSPACE";

export const init_worskpaces_store = async (): Promise<void> => {
  try {
    const params = new URLSearchParams(window.location.search)
    const page = Number(params.get('page'))
    await get_list_workspaces_api(page || 1).then((res) => {
      workspaces.value = res.data
      workspaces_metadata.value = res.metadata
    })
  } catch (e) {
    console.log(e)
  }
}

export const find_workspaces_store = async (name: string, page: number = 1): Promise<void> => {
  try {
    await find_workspaces_api(name, page).then(res => {
      workspaces.value = res.data
      workspaces_metadata.value = res.metadata
    })
  } catch (e) {
    console.log(e)
  }
}

export const load_more_workspaces_store = async (page: number): Promise<void> => {
  try {
    await get_list_workspaces_api(page).then((res) => {
      workspaces.value = res.data
      workspaces_metadata.value = res.metadata
    })
  } catch (e) {
    console.log(e)
  }
}

export const set_current_workspace = (id: string | undefined): void => {
  if(id) {
    const find: i_workspace | undefined = workspaces.value.find((item: i_workspace) => item.id === id);
    if(find) {
      current_workspace.value = find
      localStorage.setItem(KEY_WORKSPACE, find.id);
    }
  }
}

export const id_current_workspace = computed<string | undefined>(() => {
  return current_id_workspace.value
})

export const current_member_ids = computed((): Array<string> => {
  if(current_workspace.value) {
    return current_workspace.value.members.map(member => member.id);
  }
  return []
})

export const is_host_workstore = computed((): boolean => {
  if(current_workspace.value && auth_store.value.user) {
    const members = current_workspace.value.members;
    return members.some((member) => member.id === auth_store.value.user?.id && member.roleInWorkspace === "HOST")
  }
  return false
})


export const is_moderator_workstore = computed((): boolean => {
  if(current_workspace.value && auth_store.value.user) {
    const members = current_workspace.value.members;
    return members.some((member) => member.id === auth_store.value.user?.id && member.roleInWorkspace === "MODERATOR")
  }
  return false
})

export const is_member_workstore = computed((): boolean => {
  if(current_workspace.value && auth_store.value.user) {
    const members = current_workspace.value.members;
    return members.some((member) => member.id === auth_store.value.user?.id && member.roleInWorkspace === "MEMBER")
  }
  return false
})


export const clear_workspaces_store = (): void => {
  workspaces.value = []
  current_id_workspace.value = undefined
  workspaces_metadata.value = undefined
  current_workspace.value = undefined
}
