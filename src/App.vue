<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { createThinoAsync, ThinoType } from "@/apis/ThinoService";
import { AlignTextCenterOne, List as List2, ViewGridCard, ViewGridList, ViewList, Write} from "@icon-park/vue-next";

const text = ref('');
const success = ref('');
const type = ref(ThinoType.FILE);
const list = ref(true);
const port = ref(43999);

utools.onPluginEnter(({ code, type, payload }) => {
  console.log(code, type, payload);
  if (payload !== 'thino') {
    text.value = payload;
  }
});

const submit = async () => {
  if (text.value.length === 0)
    return;

  await createThinoAsync({
    isList: list.value,
    type: type.value,
    text: text.value
  }, port.value, () => {
    success.value = '提交成功';
    utools.hideMainWindow();
    clear();
    utools.outPlugin();
  }, () => {
    success.value = '提交失败';
  })
};

const clear = () => {
  text.value = '';
  type.value = ThinoType.FILE;
  success.value = '';
}

const switchListMode = () => {
  list.value = !list.value;
};

const switchType = (t: ThinoType) => {
  type.value = t;
}

// 在组件被创建时添加监听器
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

// 在组件被销毁时移除监听器
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});

const handleKeydown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault();
    submit();
  }
};


</script>

<template>
  <div class="responsive-width p-5">
    <div class="text-center mb-4">
      <h1 class="text-2xl font-bold text-purple-500 inline">Memos</h1>
      <span class="text-sm text-gray-400 align-baseline ml-100">（by coolliuzw）</span>
    </div>

    <div class="content-paper">
      <textarea v-model="text"
                rows="16"
                class="w-full resize-none overscroll-y-auto outline-0">
      </textarea>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div class="text-left inline-block align-middle col-span-3">

        <div @click="switchListMode" class="group-btn cursor-pointer">
          <view-grid-list v-if="list" theme="outline" size="16" fill="#333333" class="group-btn-text" title="List Mode"/>
          <list2 v-else theme="outline" size="16" fill="#333333" class="group-btn-text" title="TODO Mode"/>
        </div>

        <div class="group-btn cursor-pointer ml-2.5">
          <button @click="switchType(ThinoType.FILE)"
                  class="group-btn-text"
                  :class="{'group-btn-current': type === ThinoType.FILE}"
                  title="FILE">
            <write theme="outline" size="16" fill="#333333" class="sort-btn-icon"/>
          </button>

          <button @click="switchType(ThinoType.DAILY)"
                  class="group-btn-text"
                  :class="{'group-btn-current': type === ThinoType.DAILY}"
                  title="DAILY">
            <align-text-center-one theme="outline" size="16" fill="#333333" class="sort-btn-icon"/>
          </button>

          <button @click="switchType(ThinoType.CANVAS)"
                  class="group-btn-text"
                  :class="{'group-btn-current': type === ThinoType.CANVAS}"
                  title="CANVAS">
            <view-grid-card theme="outline" size="16" fill="#333333" class="sort-btn-icon"/>
          </button>

          <button @click="switchType(ThinoType.MULTI)"
                  class="group-btn-text"
                  :class="{'group-btn-current': type === ThinoType.MULTI}"
                  title="MULTI">
            <view-list theme="outline" size="16" fill="#333333" class="sort-btn-icon"/>
          </button>

        </div>

        <!-- <div class="group-btn ml-2.5 text-xs leading-8">
          <span>PORT:</span>
          <input v-model="port" class="w-12">
        </div> -->

      </div>

      <div class="text-right inline-block align-middle">
        <button class="bg-purple-500 rounded-lg text-white px-8 py-1.5 self-end" @click="submit">NOTEIT ✍️</button>
      </div>
    </div>
    <span>{{ success }}</span>
  </div>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>@/apis/ThinoService