<!--suppress TypeScriptValidateTypes -->
<template>
    <div class="header">
        <el-input v-model="user" placeholder="请输入成员名称" style="width: 150px;"></el-input>
        <el-input v-model="date" placeholder="请输入直播日期" style="width: 150px;"></el-input>
        <el-button round style="background-color:transparent;margin-right: 30px" @click="submit">加载列表</el-button>
    </div>
    <div class="table" style="margin-top: 1%;">
        <el-table :data="tableData" :header-cell-style="{ background: '#e1e3e6', color: '#606266' }" empty-text="暂无数据"
            style="width:100%;height:100%">
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="成员" prop="owner_name"></el-table-column>
            <el-table-column label="类型" prop="live_type"></el-table-column>
            <el-table-column label="时间" prop="ctime"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="{ row }">
                    <el-button round style="background-color:transparent;margin-right: 30px" @click="push(row)">
                        在线观看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <div v-if="isCall === 'ok'" class="pagination" style="margin-top: 1%;">
        <!--suppress TypeScriptValidateTypes -->
        <el-pagination :pager-count="pager" :total="total" layout="prev, pager, next" @current-change="currentChange"
            @prev-click="prevClick" @next-click="nextClick"></el-pagination>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { WebviewWindow } from '@tauri-apps/api/window';
import axios from 'axios'
const page = ref(1)
const pager = 5
const total = ref(0)

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
});

function currentChange(value: any) {
    page.value = value
    submit()
}

function prevClick(value: any) {
    page.value = value
    submit()
}

function nextClick(value: any) {
    page.value = value
    submit()
}

let tableData = ref([])
const date = ref('')
const user = ref('')
const isCall = ref('')

function push(row: any) {
    console.log(row)
    if (row.play_stream_path.indexOf(".m3u8") != -1) {
        let webview = new WebviewWindow('m3u8', {
            url: '/m3u8?show=' + row.play_stream_path,
            title: row.title,
            width: 460,
            height: 815,
        })
      webview.once('tauri://error', function () {
          alert("请勿重复打开播放窗口")
        })
    } else {
      console.log('/mp4?show=' + row.play_stream_path)
        let webview = new WebviewWindow('mp4', {
            url: '/mp4?show=' + row.play_stream_path,
            title: row.title,
            width: 460,
            height: 815,
        })
      webview.once('tauri://error', function () {
          alert("请勿重复打开播放窗口")
        })
    }

}

function submit() {
    let payload = {
        page: page.value,
        owner_name: user.value,
        ctime: date.value
    }
    instance.post("/record",payload).then(
        res=>{
          tableData.value=res.data.data;
          total.value=res.data.total;
          isCall.value="ok";
        }
    )
}

</script>

<style>
.header {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}

.pagination {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}
</style>